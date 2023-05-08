require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const url = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:27017/${process.env.DATABASE_NAME}`;
let client = null;

function connect() {
    return MongoClient.connect(url).then((_client) => {
        client = _client;
        console.log("Connected successfully to MongoDB server");
    }).catch((err) => {
        console.log("Failed to connect to MongoDB server", err);
        throw err;
    });
}

function getClient() {
    if (!client) {
        throw new Error('MongoDB database not initialized');
    }

    return client;
}

module.exports = {
    connect,
    getClient
};

