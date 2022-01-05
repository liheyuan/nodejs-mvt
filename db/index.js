const { SQLITE_FILE } = require('../utils/constant')
const db = require('better-sqlite3')(SQLITE_FILE)

function queryOne(sql, params) {
    params = params || []
    return db.prepare(sql).get(params)
}

function queryAll(sql, params) {
    params = params || []
    return db.prepare(sql).all(params)
}

function run(sql, params) {
    return db.prepare(sql).run(params).changes
}

process.on('exit', () => {
    db.close()
})

process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));

module.exports = {
    queryOne,
    queryAll,
    run
}