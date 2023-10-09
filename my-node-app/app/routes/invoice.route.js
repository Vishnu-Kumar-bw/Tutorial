module.exports = app => {
    const invoice = require("../controllers/invoice.controller.js");

    var router = require("express").Router();

    router.get("/", invoice.findAll);

    app.use('/invoices', router);
};