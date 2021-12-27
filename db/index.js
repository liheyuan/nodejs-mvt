const sqlite = require('sqlite3')
const { SQLITE_FILE } = require('../utils/constant')
const db = new sqlite.Database(SQLITE_FILE)

function queryOne(sql, params) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            stmt = db.prepare(sql)
            params = params || []
            stmt.all(...params, (err, rows) => {
                if (rows.length >= 1) {
                    resolve(rows[0])
                } else {
                    resolve(null)
                }
            })
            stmt.finalize()
        })
    })
}

process.on('SIGINT', () => {
    db.close()
})

module.exports = {
    queryOne
}