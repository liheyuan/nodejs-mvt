const jwt = require('jsonwebtoken')
const Router = require('koa-router')
const {JWT_KEY, JWT_EXPIRED} = require('../utils/constant')
const router = Router()


router.prefix('/api/user')

router.get('/', (ctx, next) => {
    const user = ctx.state.user.user
    ctx.body = {
        status: 200,
        name: user,
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
})

router.post('/login', (ctx, next) => {
    const user = ctx.request.body.username
    const pass = ctx.request.body.password
    if (user === 'admin' && pass === '123456') {
        const token = jwt.sign(
            {user},
            JWT_KEY,
            {expiresIn: JWT_EXPIRED}
        )
        ctx.body = {
            status: 200,
            token: token
        }
    } else {
        ctx.throw(401, "Invalid username or password")
    }
})

router.delete('/logout', (ctx, next) => {
    // TODO: invalid token
    ctx.body = {
        status: 200
    }
})

module.exports = router