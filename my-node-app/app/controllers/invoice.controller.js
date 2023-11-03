const db = require("../models/db");
const { errorLogger } = require('../logs/loggers');

// This function should retrieve all invoices.
exports.findAll = (req, res) => {
    db.query('SELECT * FROM invoices', (err, results, fields) => {
        if (err) {
            errorLogger.error(err.message);
            res.status(500).json({ error: 'An error occurred while fetching the invoices.' });
        } else {
            res.json(results);
        }
    });
};

// This function should retrieve a single invoice by its ID.
exports.findOne = (req, res) => {
    const invoiceId = req.params.id;
    db.query('SELECT * FROM invoices WHERE id = ?', [invoiceId], (err, results) => {
        if (err) {
            errorLogger.error(err.message);
            res.status(500).json({ error: 'An error occurred while fetching the invoice.' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Invoice not found' });
            } else {
                res.json(results[0]);
            }
        }
    });
};

// This function should create a new invoice.
exports.create = (req, res) => {
    const { customer_id, date, due_date, terms, total_amount } = req.body;
    db.query('INSERT INTO invoices (customer_id, date, due_date, terms, total_amount) VALUES (?, ?, ?, ?, ?)', [customer_id, date, due_date, terms, total_amount], (err, result) => {
        if (err) {
            errorLogger.error(err.message);
            res.status(500).json({ error: 'An error occurred while creating the invoice.' });
        } else {
            res.status(201).json({ message: 'Invoice created successfully', id: result.insertId });
        }
    });
};

// This function should update an existing invoice.
exports.update = (req, res) => {
    const invoiceId = req.params.id;
    const { customer_id, date, due_date, terms, total_amount } = req.body;
    db.query('UPDATE invoices SET customer_id = ?, date = ?, due_date = ?, terms = ?, total_amount= ? WHERE id = ?', [customer_id, date, due_date, terms, total_amount, invoiceId], (err, result) => {
        if (err) {
            errorLogger.error(err.message);
            res.status(500).json({ error: 'An error occurred while updating the invoice.' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Invoice not found' });
            } else {
                res.json({ message: 'Invoice updated successfully' });
            }
        }
    });
};

// This function should delete an existing invoice.
exports.delete = (req, res) => {
    const invoiceId = req.params.id;
    db.query('DELETE FROM invoices WHERE id = ?', [invoiceId], (err, result) => {
        if (err) {
            errorLogger.error(err.message);
            res.status(500).json({ error: 'An error occurred while deleting the invoice.' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Invoice not found' });
            } else {
                res.json({ message: 'Invoice deleted successfully' });
            }
        }
    });
};
