import httpStatusCode from 'http-status-codes';
const notFound = (req, res) => {
    res.status(httpStatusCode.StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Route not found'
    });
};
export default notFound;
//# sourceMappingURL=notFoundMiddleware.js.map