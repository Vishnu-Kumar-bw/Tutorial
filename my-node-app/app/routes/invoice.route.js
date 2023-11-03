module.exports = app => {
    const invoice = require("../controllers/invoice.controller.js");

    var router = require("express").Router();

    router.get("/", invoice.findAll);

    router.get("/:id", invoice.findOne);

    router.post("/", invoice.create);

    router.put("/:id", invoice.update);

    router.delete("/:id", invoice.delete);

    app.use('/invoices', router);
};