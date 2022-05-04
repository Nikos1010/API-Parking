const mongodb = require('mongodb');
const getDb = require('../database/db').getDb;

class Invoice {
    constructor(entryHour, exitHour) {
        this.entryHour = entryHour;
        this.exitHour = exitHour;
    }

    save() {
        const db = getDb();
        return db.collection('invoices').insertOne(this)
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('invoices').find().toArray()
            .then(products => products)
            .catch(err => console.log(err));
    }
}

module.exports = Invoice;