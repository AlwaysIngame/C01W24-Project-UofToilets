import express from 'express';
import http from 'http';
import bodyParser from 'body-parser'
import { MongoClient, ObjectId, Db } from 'mongodb';

const app = express();
const PORT = 4000;
const mongoURL = "mongodb://127.0.0.1:27017";
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
};

app.post("/registerUser", express.json(), async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({error: "Missing username or password."});
        }

        const userCollection = db.collection(COLLECTIONS.users);
        const existingUser = await userCollection.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username al"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await userCollection.insertOne({
            username,
            password: hashedPassword,
        });

        const token = jwt.sign({ username }, "secret-key", { expiresIn: "1h" });
        res.status(201).json({ response: "User registered successfully.", token });
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


