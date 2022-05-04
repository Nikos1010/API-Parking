const Sequelize = require('sequelize');
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const { db, dbMongo } = require('../config');

let _db;

const sequelize = new Sequelize(db.database, db.user, db.password, {
    dialect: db.dialect,
    host: db.host
});

const mongoConnect = callback => {
    MongoClient.connect(dbMongo.connectionUrl)
        .then(client => {
            console.log('Connected with Mongo');
            _db = client.db();
            callback(client)
        })
        .catch(err => console.log(err));
};

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'Database not Found!';
}

exports.sequelize = sequelize;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;