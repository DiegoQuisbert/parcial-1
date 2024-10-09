const Task = require('../models/taskModel');
const User = require('../models/userModel');

const createTask = async(req, res) => {
    const {description, userId} = req.body;

    if(!description || !userId){
        res.status(400).json({msg: 'Faltan parámetros :/', data: {description, userId}});
    }

    try {
        const user = await User.findById(userId);

        const newTask = new Task({description, user: user._id});
        await newTask.save();
        res.status(200).json({msg: 'La tarea fue creada', data: newTask})
    }catch(error){
        console.error(error);
        res.status(500).json({msg: 'contamos con un error chaval', data: {}});
    }
}

const getTasks = async (req, res) => {
    const tasks = req.params;
    res.status(200).json({msg: 'oke', data: tasks});
}

const getTasksByUserId = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        if(user){
            res.status(200).json({msg: 'tarea obtenida', data: user});
        }else {
            res.status(404).json({msg: 'La tarea no ha sido encontrada', data: {}})
        }
    }catch(error){
        console.error(error);
        res.status(500).json({msg: 'tenemos un nuevo error tio', data: {}})
    }
}

const deleteTasksById = async (req, res) => {
    const {id} = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if(task){
            res.status(200).json({msg: 'tarea eliminada', data: task});
        }else {
            res.status(404).json({msg: 'La tarea no ha sido eliminada', data: {}})
        }
    }catch(error){
        console.error(error);
        res.status(500).json({msg: 'tenemos otro un nuevo error tio', data: {}})
    }
}

const updateTaskById = async (req, res) => {
    const {id} = req.params;
    const {description} = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, {description}, {new: true});
        if(task){
            res.status(200).json({msg: 'tarea actualizada', data: task});
        }else {
            res.status(404).json({msg: 'La tarea no ha sido actualizada', data: {}})
        }
    }catch(error){
        console.error(error);
        res.status(500).json({msg: 'ok tenemos otro nuevo error', data: {}})
    }
}

module.exports = {createTask, getTasks, getTasksByUserId, deleteTasksById, updateTaskById};