import express from 'express';
import http from 'http';
import bodyParser from 'body-parser'
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const PORT = 4000;
const mongoURL = "mongodb://127.0.0.1:27017";
const dbName = "gohere"

let db;

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