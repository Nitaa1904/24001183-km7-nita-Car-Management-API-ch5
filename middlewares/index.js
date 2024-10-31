// errorMiddleware to handle errors
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({
        status: "Failed",
        message: "An error occurred",
        IsSuccess: false,
        data: null,
    });
};

// notFoundMiddleware for handling 404 Not Found errors
const notFoundMiddleware = (req, res, next) => {
    return res.status(404).json({
        status: "Failed",
        message: "Not found",
        IsSuccess: false,
        data: null,
    });
};

module.exports = {
    errorMiddleware,
    notFoundMiddleware,
};
