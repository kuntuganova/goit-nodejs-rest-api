const { RequestError } = require('../helpers');
const { Contact } = require('../models/contact');

async function removeById(req, res) {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
        throw RequestError(404, 'Not found');
    }
    res.json({ message: 'The contact has been deleted' });
}

module.exports = removeById;
