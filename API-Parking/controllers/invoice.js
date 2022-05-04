const InvoiceMongo = require('../models/invoiceMongo');

exports.getInvoices = (req, res) => {
    InvoiceMongo.fetchAll()
        .then(invoices => {
            if (invoices.length > 0) {
                res.json(invoices);
            } else {
                res.status(404).send('Invoices not found');
            }
        })
        .catch(err => console.log(err));
}