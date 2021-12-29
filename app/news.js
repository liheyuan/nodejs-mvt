const Router = require('koa-router')
const router = Router()
const { run, queryOne } = require('../db')

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

router.get('/:id', async (ctx, next) => {
    let data = await queryOne("SELECT * FROM `news` WHERE `id` = ?", [ctx.params.id])
    if (data) {
        data.tags = data.tags.split(',')
        data.show = !!data.show
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

module.exports = router