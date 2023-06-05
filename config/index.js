const dotenv = require('dotenv')
dotenv.config();

module.exports = {
    urlDB: process.env.MONGO_URL
}