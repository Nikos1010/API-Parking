import { Sequelize } from 'sequelize';
import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
import config from '../config.js';

const { database, username, password, options } = config.db;
const { connectionUrl } = config.dbMongo;

let _db;

export const sequelize = new Sequelize(database, username, password, options);

await sequelize.sync(/* force: true */);

export const mongoConnect = callback => {
    MongoClient.connect(connectionUrl)
        .then(client => {
            console.log('Connected with Mongo');
            _db = client.db();
            callback(client)
        })
        .catch(err => console.log(err));
};

export const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database found!';
}