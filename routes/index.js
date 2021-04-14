const producerRouter = require('./producers');
const moviesRouter = require('./movies');
const genreRouter = require('./genres');

module.exports = function (app) {
    app.use('/api', [
        producerRouter,
        moviesRouter,
        genreRouter,
    ]);
};
