const User = require('../models/userModel.js');

const jwt = ('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.SECRETKEY;
const salt = 10;

const createUser = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400).json({msg: 'Falta de información obligatoria', data: {name, email, password}})
    }

    const passwordHash = await bcrypt.hash(password, salt);

    try {
        const newUser = new User({name, email, password: passwordHash})
        await newUser.save();
        res.status(200).json({msg: 'Usuario creado', data: newUser})
    }catch (error){
        console.error(error);
        res.status(500).json({msg: 'El usuario no ha sido creado', data: {}})
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            res.status(401).json({msg: 'El email es incorrecto o no existe', data: {}});
        }

        const passwordOk = await bcrypt.compare(password, user.password);
        if(!passwordOk){
            res.status(401).json({msg: 'La contraseña es incorrecta o no existe', data: {}});
        }

        const data = {
            userId: user._id,
            name: user.name
        }

        const token = jwt.sign(data, secretKey, {expiresIn: '1h'});
        console.log(token);

        res.status(200).json({msg: 'exito!', data: {jwt: token}});
    } catch(error){
        console.error(error)
        res.status(500).json({msg: 'tenemo un error wtf', data: users});
    }
}

const getUser = async (req, res)=>{
    const users = await User.find();
    res.status(200).json({msg: 'dale', data: users});
}

const getUsersById = async(req, res) =>{
    const {id} = req.params;
    try{
        const user = await User.findById(id);
        if(user){
            res.status(200).json({msg: 'el usuario fue encontrado', data: user});
        }else {
            res.status(400).json({msg: 'el usuario no ha sido encontrado', data: {}});
        }
    }catch (error){
        console.error(error);
        res.status(500).json({msg: 'No se encontró la Id'});
    }
}

const deleteUserById = async (req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findByIdAndDelete(id);
        if(user){
            res.status(200).json({msg: 'usuario eliminado', data: user});
        }else{
            res.status(400).json({msg: 'el usuario no pudo ser eliminado', data: {}})
        }
    }catch(error){
        console.error(error);
        res.status(500).json({msg: 'Ha ocurrido un error qué', data: {}})
    }
}

const updateUserById = async (req, res) => {
    const {id} = req.params;
    const {name, email, password} = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, {name, email, password}, {new: true});
        if(user){
            res.status(200).json({msg: 'Usuario actualizado', data: user});
        }else{
            res.status(404).json({msg: 'El usuario no pudo ser actualizado', data: {}});
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({msg: 'wtf un error', data: {}})
    }
}

module.exports = {createUser, getUser, getUsersById, deleteUserById, updateUserById, login};