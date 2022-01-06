// convert type
function convertNews(news) {
    news.tags = news.tags === '' ? [] : news.tags.split(',')
    news.show = !!news.show
    return news
}

function sqlAnd(where, k) {
    if (where === 'WHERE') {
      return `${where} \`${k}\` = ?`
    } else {
      return `${where} AND \`${k}\` = ?`
    }
}

function sqlLike(where, k) {
    if (where === 'WHERE') {
      return `${where} \`${k}\` LIKE ?`
    } else {
      return `${where} AND \`${k}\` LIKE ?`
    }
}


module.exports = {
    convertNews,
    sqlAnd,
    sqlLike
}