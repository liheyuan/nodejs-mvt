// convert type
function convertNews(news) {
    news.tags = news.tags === '' ? [] : news.tags.split(',')
    news.show = !!news.show
    return news
}

module.exports = {
    convertNews
}