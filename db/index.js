const { SQLITE_FILE } = require('../utils/constant')
const db = require('better-sqlite3')(SQLITE_FILE)

function queryOne(sql, params) {
    return db.prepare(sql).get(params)
}

function run(sql, params) {
    return db.prepare(sql).run(params).changes
}


process.on('SIGINT', () => {
    db.close()
})

module.exports = {
    queryOne,
    run
}