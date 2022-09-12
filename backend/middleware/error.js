module.exports = (err, req, res, next) => {
    console.log("Middleware Error Hadnling".red.bold);
    const errStatus = err.code || 500;
    const errMsg = err.message || "Something went wrong";
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
};
