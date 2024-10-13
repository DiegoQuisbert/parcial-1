const userRouter = require('./userRouter');
const reviewRouter = require('./reviewsRouter');
const movieRouter = require('./movieRouter');
const directorRouter = require('./directorRouter');


function routerAPI(app){
    app.use('/api/users', userRouter);
    app.use('/api/reviews', reviewRouter);
    app.use('/api/movies', movieRouter);
    app.use('/api/directors', directorRouter);
}

module.exports = routerAPI;