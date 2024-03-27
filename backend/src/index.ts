import express from 'express';
import http from 'http';
import bodyParser from 'body-parser'
import { MongoClient, ObjectId, Db } from 'mongodb';

const app = express();
const PORT = 4000;
let mongoURL: string;
if (process.env.ENV === 'Docker') {
    mongoURL = 'mongodb://mongodb:27017';
} else {
    mongoURL = 'mongodb://127.0.0.1:27017';
}
const dbName = "gohere"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { COLLECTIONS, Washroom, WashroomLocationReqPayload, isValidDatabaseWashroom } from "./databasetypes";
import haversineDistance from 'haversine-distance';
import { randomUUID } from 'crypto';
import { jwtDecode } from 'jwt-decode';

interface UsernameToken {
    username: string
}

let db: Db;

async function connectToMongo() {
    const client = new MongoClient(mongoURL);

    try {
        await client.connect();
        console.log("Connected to database " + dbName);
        db = client.db(dbName);
    } catch (error) {
        console.error("Error connecting to MongoDB: " + error);
    }
}

connectToMongo();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

app.post("/registerUser", express.json(), async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({error: "Missing username or password."});
        }

        const userCollection = db.collection(COLLECTIONS.Users);
        const existingUser = await userCollection.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists."})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await userCollection.insertOne({
            username,
            password: hashedPassword,
        });

        const token = jwt.sign({ username }, "secret-key", { expiresIn: "1h" });
        res.status(201).json({ response: "User registered successfully.", token: token });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/loginUser", express.json(), async (req, res) => {
    try {
        const { username, password } = req.body;
    
        // Basic body request check
        if (!username || !password) {
        return res
            .status(400)
            .json({ error: "Missing username or password." });
        }
    
        // Find username in database
        const userCollection = db.collection(COLLECTIONS.Users);
        const user = await userCollection.findOne({ username });
    
        // Validate user against hashed password in database
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ username: username }, "secret-key", { expiresIn: "1h" });
        
            // Send JSON Web Token to valid user
            res.json({ response: "User logged in succesfully.", token: token }); //Implicitly status 200
        } else {
        res.status(401).json({ error: "Incorrect username or password." });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/deleteUser", express.json(), async (req, res) => {
    try {
        const username: string | undefined = req.body.username;
        const password: string | undefined = req.body.password;

        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Missing authentication token"});
        }

        const token = req.headers.authorization.split(" ")[1];

        if (!username || !password) {
        return res.status(400).json({ error: "Missing username or password." });
        }

        const userCollection = db.collection(COLLECTIONS.Users);
        const user = await userCollection.findOne({ username });
    
        if (!(user && (await bcrypt.compare(password, user.password)))) {
            return res.status(401).json({ error: "Incorrect username or password." });
        }

        jwt.verify(token, "secret-key", async (err, decoded) => {
            if (err || jwtDecode<UsernameToken>(token).username != username) { return res.status(401).send("Unauthorized."); }
            const result = await userCollection.deleteOne({ username: username });
            // Delete all other information
            
            if (result.deletedCount === 1) {
                res.status(200).json({ response: "User " + username + " deleted."});
            } else {
                res.status(404).json({ error: "Could not find username to delete." })
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/getWashroomByLocation/:payload", express.json(), async (req, res) => {
    const default_radius = 3000;
    try {
        const payload: string[] = req.params.payload.split('&');
        const request: WashroomLocationReqPayload = {
            latitude: parseFloat(payload[0]),
            longitude: parseFloat(payload[1]),
            radius: parseInt(payload[2]),
        };
        if (!request.latitude || !request.longitude) {
            res.status(400).json( {error: "Longitude and latitude missing"} );
            return;
        }
        if (!request.radius) {
            request.radius = default_radius;
        }
        const userCollection = db.collection(COLLECTIONS.Washrooms);
        const washrooms = (await userCollection.find().toArray()).filter((washroom) => {
            // if (!washroom.approved) return false;
            let dist = haversineDistance({ lat: washroom.latitude, lon: washroom.longitude },
                              { lat: request.latitude, lon: request.longitude });
            return dist <= request.radius!;
        });

        res.status(200).json({ response: washrooms })
        
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/addWashroom", express.json(), async (req, res) => {
    try {

        let new_washroom: Washroom = req.body;
        new_washroom.approved = false;
        new_washroom.id = randomUUID();
        if (!isValidDatabaseWashroom(req.body)) {
            res.status(404).json({ error: "Invalid request body." });
            return;
        }
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            console.log(token);
            new_washroom.owner_username = jwtDecode<UsernameToken>(token).username;
        }
        const washroomCollection = db.collection(COLLECTIONS.Washrooms);
        const result = washroomCollection.insertOne(new_washroom);
        res.status(201).json({
            response: "Washroom added successfully.",
            washroomID: new_washroom.id,
        })
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
})

app.delete("/deleteWashroom/:id", express.json(), async (req, res) => {
    try {

        let id = req.params.id;

        if (!req.headers.authorization) {
            res.status(401).json("Not Authorized.");
            return;
        }
        const token = req.headers.authorization.split(" ")[1];

        const washroomCollection = db.collection(COLLECTIONS.Washrooms);

        jwt.verify(token, "secret-key", async (err, decoded) => {
            if (err) { return res.status(401).send("Unauthorized."); }
            const jwtDecoded = jwtDecode<UsernameToken>(token);
            const result = await washroomCollection.deleteOne({owner_username: jwtDecoded.username, id: id});
            
            if (result.deletedCount === 1) {
                res.status(200).json({ response: "Washroom with id " + id + " deleted."});
            } else {
                res.status(404).json({ error: "Could not find washroom associated with token to delete." })
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
})


