const Review = require('../models/reviewModel');
const User = require('../models/userModel');

const createReview = async(req, res) => {
    const { review, userId } = req.body;

    console.log(review, userId)

    if (!review || !userId) {
        return res.status(400).json({ msg: 'Faltan parámetros :/', data: { review, userId } });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        const newReview = new Review({ review, user: user._id });
        await newReview.save();
        res.status(200).json({ msg: 'La reseña fue creada', data: newReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Contamos con un error', data: {} });
    }
}


const getReviews = async (req, res) => {
    const userId = req.body.userId;

    const reviews = await Review.find( {user: userId} ).populate('user');
    res.status(200).json({msg: 'oke', data: reviews});
}

const getReviewsByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const reviews = await Review.find({ user: id }).populate('user');
        if (reviews.length > 0) {
            res.status(200).json({ msg: 'Reseñas encontradas', data: reviews });
        } else {
            res.status(404).json({ msg: 'No se encontraron reseñas para este usuario', data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener las reseñas', data: {} });
    }
}
const deleteReviewsById = async (req, res) => {
    const {id} = req.params;
    try {
        const review = await Review.findByIdAndDelete(id);
        if(review){
            res.status(200).json({msg: 'tarea eliminada', data: review});
        }else {
            res.status(404).json({msg: 'La tarea no ha sido eliminada', data: {}})
        }
    }catch(error){
        console.error(error);
        res.status(500).json({msg: 'tenemos otro un nuevo error tio', data: {}})
    }
}

const updateReviewById = async (req, res) => {
    const {id} = req.params;
    const {review} = req.body;
    try {
        const review = await Review.findByIdAndUpdate(id, {review}, {new: true});
        if(review){
            res.status(200).json({msg: 'tarea actualizada', data: review});
        }else {
            res.status(404).json({msg: 'La tarea no ha sido actualizada', data: {}})
        }
    }catch(error){
        console.error(error);
        res.status(500).json({msg: 'ok tenemos otro nuevo error', data: {}})
    }
}

module.exports = {createReview, getReviews, getReviewsByUserId, deleteReviewsById, updateReviewById};