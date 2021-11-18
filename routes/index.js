const errHandeler = require('../middleware/errorHandler')
const authRoute = require('./authRoutes');
const showprofileRoute = require('./showprofileRoute');
const homeRoute = require('./homeRoute');
const lay_tt_user= require('../middleware/laythongtinuser');
function route(app){
    app.use(lay_tt_user);
    app.use('/auth', authRoute);
    app.use('/show', showprofileRoute);
    app.use('/home', homeRoute);
    app.use('/', homeRoute);
    app.all('*',(req, res, next) => {
        const err = new Error('Không a Tồn Tại Trang !!!');
        err.status = 404;
        next(err);
    })
    app.use(errorHandler);
}
module.exports = route