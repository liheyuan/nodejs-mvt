const Router = require('koa-router')
const { query } = require('koa/lib/request')
const router = Router()
const { run, queryOne, queryAll } = require('../db')
const { convertNews } = require('../utils/util')

router.prefix('/api/news')

router.post('/', async (ctx, next) => {

    const { title, catId, content } = ctx.request.body

    const tags = ctx.request.body.tags.join(',')

    const show = +ctx.request.body.show

    await run("INSERT INTO `news`(`title`, `catId`, `tags`, `show`, `content`) VALUES" +
        "(?, ?, ?, ?, ?)", [title, catId, tags, show, content])

    ctx.body = {
        status: 200
    }
})

router.put('/', async (ctx, next) => {

    const { id, title, catId, content } = ctx.request.body

    const tags = ctx.request.body.tags.join(',')

    const show = +ctx.request.body.show

    await run("UPDATE `news` SET `title` = ?, `catId` = ?, `tags` = ?, `show` = ?, `content` = ? WHERE `id` = ?", [title, catId, tags, show, content, id])

    ctx.body = {
        status: 200
    }
})

router.get('/list', async (ctx, next) => {
    const {pageSize = 10, currentPage = 1 } = ctx.query
    const offset = (currentPage - 1) * pageSize
    // sql
    let sql = "SELECT * FROM `news`"
    sql = `${sql} limit ${pageSize} offset ${offset}`
    // data
    let data = await queryAll(sql)
    list = data.map(n => convertNews(n))

    // cnt
    let { cnt } = await queryOne("SELECT COUNT(*) AS cnt FROM `news`")
    
    ctx.body = {
        status: 200,
        newsList: list,
        newsCnt: cnt
    }
})

router.get('/:id', async (ctx, next) => {
    let data = await queryOne("SELECT * FROM `news` WHERE `id` = ?", [ctx.params.id])
    if (data) {
        convertNews(data)
        ctx.body = {
            status: 200,
            news: data
        }
    } else {
        ctx.body = {
            status: 404,
            msg: 'news not found'
        }
    }
    
})

router.delete('/:id', async (ctx, next) => {
    await run("DELETE FROM `news` WHERE `id` = ?", [ctx.params.id])
    ctx.body = {
        status: 200
    }
    
})



module.exports = router