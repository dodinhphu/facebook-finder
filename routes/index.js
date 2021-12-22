const errorHandler = require('../middleware/errorHandler')
const authRoute = require('./authRoutes');
const showprofileRoute = require('./showprofileRoute');
const homeRoute = require('./homeRoute');
const apiface = require('./apiface');
const adminRouter = require('./adminRouter');
const contactRouter = require('./contactRouter');
const historyRouter = require('./historyRouter');
const notificationRouter = require('./notificationRouter');
const blogRouter =require('./blogRouter')

const lay_tt_user = require('../middleware/get_data');
function route(app) {
    app.use(lay_tt_user);
    app.use('/blog', blogRouter);
    app.use('/admin', adminRouter)
    app.use('/api/face', apiface);
    app.use('/auth', authRoute);
    app.use('/show', showprofileRoute);
    app.use('/contact', contactRouter)
    app.use('/history', historyRouter)
    app.use('/notification', notificationRouter)
    app.use('/home', homeRoute);
    app.use('/', homeRoute);
    app.all('*', (req, res, next) => {
        const err = new Error('Không Tồn Tại Trang !!!');
        err.status = 404;
        next(err);
    })
    app.use(errorHandler);
}
module.exports = route