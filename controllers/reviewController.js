const Review = require('../models/reviewModel');
const User = require('../models/userModel');
const Movie = require('../models/movieModel');

const createReview = async (req, res) => {
    const { review, userId, movieId } = req.body;

    if (!review || !userId || !movieId) {
        return res.status(400).json({ 
            msg: 'Faltan parámetros', 
            data: { review, userId, movieId } 
        });
    }

    try {
        const user = await User.findById(userId);
        const movie = await Movie.findById(movieId);

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        if (!movie) {
            return res.status(404).json({ msg: 'Película no encontrada' });
        }

        const newReview = new Review({ review, user: user._id, movie: movie._id });
        await newReview.save();

        res.status(200).json({msg: 'La reseña fue creada', data: {_id: newReview._id, review: newReview.review, created: newReview.created, user: {name: user.name, _id: user._id,
},
movie: newReview.movie,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'La reseña no pudo ser creada', data: {} });
    }
};


const getReviews = async (req, res) => {
    const { userId } = req.query;

    const reviews = await Review.find({ user: userId }).populate('user');
    res.status(200).json({ msg: 'oke', data: reviews });
};

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

const getReviewsByMovieId = async (req, res) => {
    const {movieId} = req.params;
    try{
        const reviews = await Review.find({movie: movieId}).populate('user').populate('movie');

        if (reviews.length > 0) {
            res.status(200).json({msg: 'Reseñas encontradas', data: reviews});
        } else {
            res.status(404).json({msg: 'Esta película no tiene reseñas'});
        }
    } catch (error){
        console.error(error);
        res.status(500).json({msg: 'Error al obtener las reseñas', data: {} });
    }
}

const getReviewsByUserAndMovie = async (req, res) => {
    const {userId, movieId} = req.query;

    try {
        const filter = {};
        if (userId) filter.user = userId;
        if (movieId) filter.movie = movieId;

        const reviews = await Review.find(filter).populate('user').populate('movie');
        res.status(200).json({msg: 'Reseñas encontradas', data: reviews});
    } catch (error){
        console.error(error);
        res.status(500).json({msg: 'Error al obtener las resñeas', data: {} });
    }
}

const deleteReviewsById = async (req, res) => {
    const {id} = req.params;
    try {
        const review = await Review.findByIdAndDelete(id);
        if(review){
            res.status(200).json({msg: 'reseña eliminada', data: review});
        }else {
            res.status(404).json({msg: 'La reseña no ha sido eliminada', data: {}})
        }
    }catch(error){
        console.error(error);
        res.status(500).json({msg: 'Error al querer eliminar la reseña', data: {}})
    }
}

const updateReviewById = async (req, res) => {
    const { id } = req.params;
    const { review: newReview } = req.body;

    try {
        const updatedReview = await Review.findByIdAndUpdate(id, { review: newReview }, { new: true });

        if (updatedReview) {
            res.status(200).json({ msg: 'reseña actualizada', data: updatedReview });
        } else {
            res.status(404).json({ msg: 'La reseña no ha sido actualizada', data: {} });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'error al actualizar la reseña', data: {} });
    }
};


module.exports = {createReview, getReviews, getReviewsByUserId, getReviewsByMovieId, getReviewsByUserAndMovie, deleteReviewsById, updateReviewById};