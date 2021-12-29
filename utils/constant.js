const path = require('path')
module.exports = {
    SQLITE_FILE: path.join(__dirname, "../db.data"),
    JWT_KEY: 'abcdefg1234',
    JWT_EXPIRED: 60 * 60, // seconds
    PASSWORD_SALT: 'nodejs_mvt'
}