const Director = require('../models/directorModel.js');

const addDirector = async (req, res) => {
    const {compName, age, biography, photo, } = req.body;

    if(!compName || !age || !biography || !photo){
        return res.status(400).json({msg: 'Faltan parámetros :/', data: {compName, age, biography, photo}});
    }

    try {
        const director = await Director.findById();

        const newDirector = new Director({biography, age, compName, photo});
        await newDirector.save();
        res.status(200).json({msg: 'El director fue añadido', data: newDirector})
    }catch(error){
        console.error(error);
        res.status(500).json({msg: 'contamos con un error chaval', data: {}});
    }
};

const getDirector = async (req, res) => {
    try {
        const directors = await Director.find();
        res.status(200).json(directors);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener a los directores', error });
    }
};

const getDirectorById = async (req, res) => {
    try {
        const { id } = req.params;
        const director = await Director.findById(id);

        if (!director) {
            return res.status(404).json({ message: 'Director no encontrado' });
        }

        res.status(200).json(director);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener al director', error });
    }
};

const updateDirectorById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDirector = await Director.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedDirector) {
            return res.status(404).json({ message: 'El director no pudo ser actualizado' });
        }

        res.status(200).json(updatedDirector);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar al director', error });
    }
};

const deleteDirectorById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDirector = await Director.findByIdAndDelete(id);

        if (!deletedDirector) {
            return res.status(404).json({ message: 'Director no eliminado' });
        }

        res.status(200).json({ message: 'Director eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar al director', error });
    }
};

module.exports = {addDirector, getDirector, getDirectorById, updateDirectorById, deleteDirectorById};