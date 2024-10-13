const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');
const movieRouter = require('./movieRouter');
const directorRouter = require('./directorRouter');


function routerAPI(app){
    app.use('/api/users', userRouter);
    app.use('/api/tasks', taskRouter);
    app.use('/api/movies', movieRouter);
    app.use('/api/directors', directorRouter);
}

module.exports = routerAPI;