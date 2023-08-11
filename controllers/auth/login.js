const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');

const { RequestError } = require('../../helpers');

const { SECRET_KEY } = process.env;

async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw RequestError(401, 'Wrong email or password');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw RequestError(401, 'Wrong email or password');
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({ token });
}

module.exports = login;
