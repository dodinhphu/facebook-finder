errorHandler = function (err, req, res, next) {
    err.status = err.status || 500;

    if (err.code === 11000) {
        err.status = 400;
        for (let p in err.keyValue) {
            p = p.charAt(0).toUpperCase() + p.slice(1)
            err.message = `${p} Đã Tồn Tại`;
            err.key = p;
        }
    }
    if (err.kind === "ObjectId") {
        err.status = 404;
        err.message = `Profile ${req.originalUrl} Không Tồn Tại`;
    }


    if (err.status === 500) {
        err.status = 400;
        err.message = err.errors.password.message
        err.key = 'password';
    }


    /* register */
    if (err.status === 400) {
        return res.render('register', {
            message: err.message,
            key: err.key,
        })
    }
    if(err.status === 404) {
       return res.render('404')
    }

    
    res.status(err.status).json({
        status: 'fail',
        message: err.message,
    })


}
module.exports = errorHandler;