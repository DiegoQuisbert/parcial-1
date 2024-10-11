const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');

function routerAPI(app){
    app.use('/api/users', userRouter);
    app.use('/api/tasks', taskRouter);    
}

module.exports = routerAPI;