const md5 = require('crypto-js/md5')
const jwt = require('jsonwebtoken')
const Router = require('koa-router')
const { JWT_KEY, JWT_EXPIRED, PASSWORD_SALT } = require('../utils/constant')
const router = Router()
const { queryOne } = require('../db')

router.prefix('/api/user')

router.get('/', (ctx, next) => {
    const user = ctx.state.user.user
    ctx.body = {
        status: 200,
        name: user,
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
})

router.post('/login', async (ctx, next) => {

    const user = ctx.request.body.username
    const pass = md5(PASSWORD_SALT + ctx.request.body.password).toString()

    const row = await queryOne("SELECT * FROM `admin_user` WHERE username = ? AND password = ?", [user, pass])
    if (row) {
        const token = jwt.sign(
            { user },
            JWT_KEY,
            { expiresIn: JWT_EXPIRED }
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