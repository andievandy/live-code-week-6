function errorHandler(err, req, res, next) {
    if(err.name === 'SequelizeValidationError') {
        let errorMsgs = err.errors.map(error => {
            return error.message;
        });
        res.status(400).json({error: errorMsgs});
    } else {
        console.error(err.stack);
        res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = errorHandler;