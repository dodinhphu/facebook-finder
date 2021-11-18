errorHandler = function (err, req, res, next) {
    err.status = err.status || 500;

    if (err.code === 11000) {
        err.status = 400;
        for (let p in err.keyValue) {
            err.message = `${p} Đã Tồn Tại`;
        }
    }

    if(err.kind === "ObjectId"){
        err.status = 404;
        err.message =`Profile ${req.originalUrl} Không Tồn Tại`
        
    }
    res.status(err.status).json({
        status: 'fail',
        message: err.message
    })


}
module.exports = errorHandler;