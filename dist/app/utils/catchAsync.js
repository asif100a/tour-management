export const catchAsync = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch((error) => {
        console.log('Error occurred. Details:', error);
        next(error);
    });
};
//# sourceMappingURL=catchAsync.js.map