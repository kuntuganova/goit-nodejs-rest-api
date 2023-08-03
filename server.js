const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const { DB_HOST, PORT } = process.env;

mongoose.set('strictQuery', false);

mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(PORT);
        console.log('Database connection successful');
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
