const producerRouter = require('./producers');
const moviesRouter = require('./movies');

module.exports = function (app) {
    app.use('/api', [
        producerRouter,
        moviesRouter,
    ]);
};
