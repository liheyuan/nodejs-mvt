const Router = require('koa-router')
const router = Router()

router.get('/api/user', (ctx, next) => {
    ctx.body = {
        msg: 'user'
    }
})

module.exports = router