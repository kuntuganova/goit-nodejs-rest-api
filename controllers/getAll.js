const { RequestError } = require('../helpers');
const { Contact } = require('../models/contacts');

async function getAll(req, res) {
    const result = await Contact.find({}, '-createdAt -updatedAt');

    if (!result) {
        throw RequestError(404, 'Not found');
    }
    res.json(result);
}

module.exports = getAll;
