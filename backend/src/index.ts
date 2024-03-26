import express from 'express';
import http from 'http';
import bodyParser from 'body-parser'
import { MongoClient, ObjectId, Db } from 'mongodb';

const app = express();
const PORT = 4000;
let mongoURL: string;
if (process.env.ENV === 'Docker') {
    console.log("Docker");
    mongoURL = 'mongodb://mongodb:27017';
} else {
    mongoURL = 'mongodb://127.0.0.1:27017';
}
const dbName = "gohere"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

const COLLECTIONS = {
    users: "users",
    admins: "admins",
};

app.post("/registerUser", express.json(), async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({error: "Missing username or password."});
        }

        console.log("Regieter");

        const userCollection = db.collection(COLLECTIONS.users);
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
        const userCollection = db.collection(COLLECTIONS.users);
        const user = await userCollection.findOne({ username });
    
        // Validate user against hashed password in database
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ username }, "secret-key", { expiresIn: "1h" });
        
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

        const userCollection = db.collection(COLLECTIONS.users);
        const user = await userCollection.findOne({ username });
    
        if (!(user && (await bcrypt.compare(password, user.password)))) {
            return res.status(401).json({ error: "Incorrect username or password." });
        }

        jwt.verify(token, "secret-key", async (err, decoded) => {
            if (err) { return res.status(401).send("Unauthorized."); }
            console.log(decoded);
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

app.post("/registerAdmin", express.json(), async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({error: "Missing username or password."});
        }

        console.log("Register");

        const adminCollection = db.collection(COLLECTIONS.admins);
        const existingAdmin = await adminCollection.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ error: "Username already exists."})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await adminCollection.insertOne({
            username,
            password: hashedPassword,
        });

        const token = jwt.sign({ username }, "secret-key", { expiresIn: "1h" });
        res.status(201).json({ response: "User registered successfully.", token: token });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/loginAdmin", express.json(), async (req, res) => {
    try {
        const { username, password } = req.body;
    
        // Basic body request check
        if (!username || !password) {
        return res
            .status(400)
            .json({ error: "*Missing username or password" });
        }
    
        // Find username in database
        const adminCollection = db.collection(COLLECTIONS.admins);
        const admin = await adminCollection.findOne({ username });
    
        // Validate user against hashed password in database
        if (admin && (await bcrypt.compare(password, admin.password))) {
            const token = jwt.sign({ username }, "secret-key", { expiresIn: "1h" });
        
            // Send JSON Web Token to valid user
            res.json({ response: "Admin logged in succesfully.", token: token }); //Implicitly status 200
        } else {
        res.status(401).json({ error: "*Incorrect Username or Password" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/deleteAdmin", express.json(), async (req, res) => {
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

        const adminCollection = db.collection(COLLECTIONS.admins);
        const admin = await adminCollection.findOne({ username });
    
        if (!(admin && (await bcrypt.compare(password, admin.password)))) {
            return res.status(401).json({ error: "Incorrect username or password." });
        }

        jwt.verify(token, "secret-key", async (err, decoded) => {
            if (err) { return res.status(401).send("Unauthorized."); }
            console.log(decoded);
            const result = await adminCollection.deleteOne({ username: username });
            // Delete all other information
            
            if (result.deletedCount === 1) {
                res.status(200).json({ response: "Admin " + username + " deleted."});
            } else {
                res.status(404).json({ error: "Could not find username to delete." })
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});