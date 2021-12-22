const _ = require('lodash');
const Koa = require('koa');
const error = require('koa-json-error')

const app = new Koa();
let error_options = {
    // Avoid showing the stacktrace in 'production' env
    postFormat: (e, obj) => process.env.NODE_ENV === 'production' ? _.omit(obj, 'stack') : obj
};
app.use(error(error_options))

const user = require('./app/user')
app.use(user.routes(), user.allowedMethods())



app.listen(3000)