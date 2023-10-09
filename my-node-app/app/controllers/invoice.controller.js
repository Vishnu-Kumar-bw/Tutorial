const db = require("../models/db");

exports.findAll = (req, res) => {
    db.query('SELECT * FROM invoices', (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        res.json(results);
    });
};