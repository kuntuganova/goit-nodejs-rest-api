const { RequestError } = require('../helpers');
const { Contact } = require('../models/contact');

async function getById(req, res) {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

    if (!result) {
        throw RequestError(404, 'Not found');
    }
    res.json(result);
}

module.exports = getById;
