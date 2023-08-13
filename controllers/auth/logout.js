const { User } = require('../../models/user');

async function logout(req, res) {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.json({
        message: 'Successful logout',
    });
}

module.exports = logout;
