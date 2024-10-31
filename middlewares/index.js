const errorMiddleware = app.use((err, req, res, next) => {
    console.log.error(err.stack);
    return res.status(500).json({
        status: "Failed",
        message: "pokok ada error",
        IsSuccess: false,
        data: null,
    });
});

const notFoundMiddleware = app.use((req, res, next) => {
    return res.status(404).json({
        status: "Failed",
        message: "tidak ditemukan",
        IsSuccess: false,
        data: null,
    });
});

module.exports = {
    errorMiddleware,
    notFoundMiddleware
}