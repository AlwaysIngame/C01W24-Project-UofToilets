import express from 'express';
import http from 'http';
import bodyParser from 'body-parser'
import { MongoClient, ObjectId, Db } from 'mongodb';
import cors from 'cors';


const app = express();
app.use(cors());
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
import { COLLECTIONS, NewsPost, Washroom, WashroomLocationReqPayload, isValidDatabaseWashroom, isValidNewsPost } from "./databasetypes";
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
            if (err || jwtDecode<UsernameToken>(token).username != username) { return res.status(401).send({ error: "Unauthorized" }); }
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

// app.post("/registerAdmin", express.json(), async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         if (!username || !password) {
//             return res.status(400).json({error: "Missing username or password."});
//         }

//         console.log("Register");

//         const adminCollection = db.collection(COLLECTIONS.Admins);
//         const existingAdmin = await adminCollection.findOne({ username });
//         if (existingAdmin) {
//             return res.status(400).json({ error: "Username already exists."})
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         await adminCollection.insertOne({
//             username,
//             password: hashedPassword,
//         });

//         const token = jwt.sign({ username }, "secret-key", { expiresIn: "1h" });
//         res.status(201).json({ response: "User registered successfully.", token: token });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.post("/loginAdmin", express.json(), async (req, res) => {
//     try {
//         const { username, password } = req.body;
    
//         // Basic body request check
//         if (!username || !password) {
//         return res
//             .status(400)
//             .json({ error: "*Missing username or password" });
//         }
    
//         // Find username in database
//         const adminCollection = db.collection(COLLECTIONS.Admins);
//         const admin = await adminCollection.findOne({ username });
    
//         // Validate user against hashed password in database
//         if (admin && (await bcrypt.compare(password, admin.password))) {
//             const token = jwt.sign({ username }, "secret-key", { expiresIn: "1h" });
        
//             // Send JSON Web Token to valid user
//             res.json({ response: "Admin logged in succesfully.", token: token }); //Implicitly status 200
//         } else {
//         res.status(401).json({ error: "*Incorrect Username or Password" });
//         }
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.delete("/deleteAdmin", express.json(), async (req, res) => {
//     try {
//         const username: string | undefined = req.body.username;
//         const password: string | undefined = req.body.password;

//         if (!req.headers.authorization) {
//             return res.status(401).json({ error: "Missing authentication token"});
//         }

//         const token = req.headers.authorization.split(" ")[1];

//         if (!username || !password) {
//         return res.status(400).json({ error: "Missing username or password." });
//         }

//         const adminCollection = db.collection(COLLECTIONS.Admins);
//         const admin = await adminCollection.findOne({ username });
    
//         if (!(admin && (await bcrypt.compare(password, admin.password)))) {
//             return res.status(401).json({ error: "Incorrect username or password." });
//         }

//         jwt.verify(token, "secret-key", async (err, decoded) => {
//             if (err) { return res.status(401).send("Unauthorized."); }
//             console.log(decoded);
//             const result = await adminCollection.deleteOne({ username: username });
//             // Delete all other information
            
//             if (result.deletedCount === 1) {
//                 res.status(200).json({ response: "Admin " + username + " deleted."});
//             } else {
//                 res.status(404).json({ error: "Could not find username to delete." })
//             }
//         });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// });

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
            if (err) { return res.status(401).send({ error: "Unauthorized" }); }
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

app.get("/getUserWashrooms", express.json(), async (req, res) => {
    const default_radius = 3000;
    try {

        if (!req.headers.authorization) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const token = req.headers.authorization.split(" ")[1];

        const washroomCollection = db.collection(COLLECTIONS.Washrooms);
        
        jwt.verify(token, "secret-key", async (err, decoded) => {
            if (err) { return res.status(401).send({ error: "Unauthorized" }); }
            const jwtDecoded = jwtDecode<UsernameToken>(token);
            const washrooms = await washroomCollection.find({owner_username: jwtDecoded.username}).toArray();
            res.status(200).json({ response: washrooms });
        });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/getUnverifiedWashrooms", express.json(), async (req, res) => {
    const default_radius = 3000;
    try {

        if (!req.headers.authorization) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const token = req.headers.authorization.split(" ")[1];

        const washroomCollection = db.collection(COLLECTIONS.Washrooms);
        
        jwt.verify(token, "secret-key", async (err, decoded) => {
            if (err) { return res.status(401).send({ error: "Unauthorized" }); }
            const jwtDecoded = jwtDecode<UsernameToken>(token);
            if (jwtDecoded.username != "admin") {return res.status(401).send({ error: "Unauthorized" });}
            const washrooms = await washroomCollection.find({approved: false}).toArray();
            res.status(200).json({ response: washrooms });
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
        const washroomCollection = db.collection(COLLECTIONS.Washrooms);
        const washrooms = (await washroomCollection.find().toArray()).filter((washroom) => {
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


app.post("/postNews", express.json(), async (req, res) => {
    try {
        
        let newNewsPost: NewsPost = req.body;
        newNewsPost.id = randomUUID();
        if (!isValidNewsPost(newNewsPost)) {
            res.status(404).json({ error: "Invalid request body." });
            return;
        }
        if (!req.headers.authorization) {
            res.status(401).json("Not Authorized.");
            return;
        }
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "secret-key", async (err, decoded) => {
            if (err) { return res.status(401).send({ error: "Unauthorized" }); }
            const jwtDecoded = jwtDecode<UsernameToken>(token);
            if (jwtDecoded.username != "admin") {return res.status(401).send({ error: "Unauthorized" });}
            const newsCollection = db.collection(COLLECTIONS.News);
            const result = await newsCollection.insertOne(newNewsPost);
            if (result.insertedId) {
                res.status(201).json({
                    response: "News post added successfully.",
                    newsID: newNewsPost.id,
                })
            } else {
                res.status(500).json({ error: "Could not add news post." });
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.patch("/editNews/:id", express.json(), async (req, res) => {
    try {
        let id = req.params.id;
        let newNewsPost: NewsPost = req.body;
        newNewsPost.id = id;
        if (!isValidNewsPost(newNewsPost)) {
            res.status(404).json({ error: "Invalid request body." });
            return;
        }
        if (!req.headers.authorization) {
            res.status(401).json("Not Authorized.");
            return;
        }
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "secret-key", async (err, decoded) => {
            if (err) { return res.status(401).send({ error: "Unauthorized" }); }
            const jwtDecoded = jwtDecode<UsernameToken>(token);
            if (jwtDecoded.username != "admin") {return res.status(401).send({ error: "Unauthorized" });}
            const newsCollection = db.collection(COLLECTIONS.News);
            const result = await newsCollection.updateOne({id: id}, {$set: newNewsPost});
            if (result.modifiedCount === 1) {
                res.status(200).json({ response: "News post updated successfully."});
            } else {
                res.status(404).json({ error: "Could not find news post to update." })
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/getNews", express.json(), async (req, res) => {
    try {
        const newsCollection = db.collection(COLLECTIONS.News);
        const news = await newsCollection.find().toArray();
        res.status(200).json({ response: news });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/deleteNews/:id", express.json(), async (req, res) => {
    try {
        
        let id = req.params.id;
        
        if (!req.headers.authorization) {
            res.status(401).json("Not Authorized.");
            return;
        }
        const token = req.headers.authorization.split(" ")[1];
        
        const newsCollection = db.collection(COLLECTIONS.News);
        
        jwt.verify(token, "secret-key", async (err, decoded) => {
            if (err) { return res.status(401).send({ error: "Unauthorized" }); }
            const jwtDecoded = jwtDecode<UsernameToken>(token);
            if (jwtDecoded.username != "admin") {return res.status(401).send({ error: "Unauthorized" });}
            const result = await newsCollection.deleteOne({id: id});
            
            if (result.deletedCount === 1) {
                res.status(200).json({ response: "News post deleted successfully."});
            } else {
                res.status(404).json({ error: "Could not find news post to delete." })
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});