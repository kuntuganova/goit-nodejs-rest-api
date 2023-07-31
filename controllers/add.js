const { Contact } = require('../models/contacts');

async function add(req, res) {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

module.exports = add;
