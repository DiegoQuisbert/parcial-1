const User = require('../models/userModel.js');

const jwt = require('jsonwebtoken');
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
            return;
        }

        const passwordOk = await bcrypt.compare(password, user.password);
        if(!passwordOk){
            res.status(401).json({msg: 'La contraseña es incorrecta o no existe', data: {}});
            return;
        }

        const data = {
            userId: user._id,
            name: user.name,
            email: user.email
        }

        const token = jwt.sign(data, secretKey, {expiresIn: '1h'});
        console.log(token);

        res.status(200).json({msg: 'exito!', data: {jwt: token}});
    } catch(error){
        console.error(error)
        res.status(500).json({msg: 'error al logearse', data: users});
    }
}

const getUser = async (req, res)=>{
    const users = await User.find();
    res.status(200).json({msg: 'estos son los usuarios', data: users});
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
    try {
        const { id } = req.params;
        const userId = req.body.userId; 

        if (id !== userId) {
        return res.status(403).json({ msg: 'No tienes permiso para eliminar este usuario.' });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
        return res.status(404).json({ msg: 'Usuario no encontrado.' });
        }

        res.status(200).json({ msg: 'Usuario eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el usuario.', error });
    }
};

const updateUserById = async (req, res) => {
    const {id} = req.params;
    const {name, email, password} = req.body;

    try {
    const passwordHash = await bcrypt.hash(password, salt);
        const user = await User.findByIdAndUpdate(id, {name, email, password:passwordHash}, {new: true});
        if(user){
            res.status(200).json({msg: 'Usuario actualizado', data: user});
        }else{
            res.status(404).json({msg: 'El usuario no pudo ser actualizado', data: {}});
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({msg: 'error al actualizar el usuario', data: {}})
    }
}

module.exports = {createUser, getUser, getUsersById, deleteUserById, updateUserById, login};