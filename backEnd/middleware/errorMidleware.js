const errorHandler=(err, req, res, next)=>{
    const statusCode=res.statusCode ? res.statusCode : 500

    if (!res.headersSent) {
        res.status(statusCode).json({
            message: err.message,
            stack: process.env.NODE_ENV === "production" ? null : err.stack,
        });
    } else {
        next(err);
    }
};


module.exports={
    errorHandler
}
