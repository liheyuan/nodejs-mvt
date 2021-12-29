const _ = require('lodash');
const Koa = require('koa');
const error = require('koa-json-error')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const jwt = require('koa-jwt')
const { JWT_KEY } = require('./utils/constant')

const app = new Koa();

app.use(cors())
let error_options = {
    // Avoid showing the stacktrace in 'production' env
    postFormat: (e, obj) => process.env.NODE_ENV === 'production' ? _.omit(obj, 'stack') : obj
};

app.use(error(error_options))

// Custom 401
app.use((ctx, next) => {
    return next().catch(err => {
        if (401 === err.status) {
            ctx.status = 401
            ctx.body = {
                status: 401,
                msg: 'Protected resource but token invalid'
            }
        } else {
            throw err
        }
    })
})
app.use(jwt({ secret: JWT_KEY })
    .unless({ path: ['/api/user/login'] }))

app.use(bodyParser())

const user = require('./app/user')
const news = require('./app/news')
app.use(user.routes(), user.allowedMethods())
app.use(news.routes(), news.allowedMethods())

app.listen(3000)