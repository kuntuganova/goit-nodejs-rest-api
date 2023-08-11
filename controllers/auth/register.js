const bcrypt = require('bcrypt');

const { User } = require('../../models/user');

const { RequestError } = require('../../helpers');

async function register(req, res) {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw RequestError(401, 'Email is in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ name, email, password: hashPassword });
    res.status(201).json({ name: result.name, email: result.email });
}

module.exports = register;
