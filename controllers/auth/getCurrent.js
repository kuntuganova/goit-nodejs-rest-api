async function getCurrent(req, res) {
    const { name, email } = await req.user;

    res.json({ name, email });
}

module.exports = getCurrent;
