const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode){
        case 400:
            res.json({title: "Validation failed", message: err.message, stackTrace: err.stackTrace});
        case 401:
            res.json({title: "Unauthorized", message: err.message, stackTrace: err.stackTrace});
        case 403:
            res.json({title: "Forbidden", message: err.message, stackTrace: err.stackTrace});
        case 404:
            res.json({title: "Not Found", message: err.message, stackTrace: err.stackTrace});
        case 500:
            res.json({title: "Server error", message: err.message, stackTrace: err.stackTrace});
        default:
            res.json({title: "Query error", message: err.message, stackTrace: err.stackTrace, error: "true"});
            break;
    }
};

module.exports = errorHandler;