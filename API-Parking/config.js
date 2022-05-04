const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV;

const dev = {
    app: {
        port: 3000
    },
    db: {
        database: "parking",
        user: "root",
        password: "Noithyung15-25%",
        host: "localhost",
        dialect: "mysql"
    },
    dbMongo: {
        connectionUrl: "mongodb+srv://Noith:QIlyDwLZFyH3sEcP@cluster0.ddb2b.mongodb.net/parkingApi?retryWrites=true&w=majority"
    }
}

const config = {
    dev
}

module.exports = config[env];