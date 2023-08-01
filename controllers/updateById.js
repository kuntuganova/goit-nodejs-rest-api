const { RequestError } = require('../helpers');
const { Contact } = require('../models/contact');

async function updateById(req, res) {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });

    if (!result) {
        throw RequestError(404, 'Not found');
    }
    res.status(201).json(result);
}

module.exports = updateById;
