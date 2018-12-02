module.exports = function(req, res, next) {
    if (req.params.name && req.params.name === 'simon') {
        res.send(`Hello ${req.params.name}`);
    } else {
        next();
    }
};