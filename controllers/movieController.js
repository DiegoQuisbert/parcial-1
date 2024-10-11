const Movie = require('../models/movieModel'); 

const createMovie = async (req, res) => {
    
};

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las películas', error });
    }
};

const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);

        if (!movie) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la película', error });
    }
};

const updateMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }

        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la película', error });
    }
};

const deleteMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMovie = await Movie.findByIdAndDelete(id);

        if (!deletedMovie) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }

        res.status(200).json({ message: 'Película eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la película', error });
    }
};


const filterMovies = async (req, res) => {
    try {
        const { year, genre } = req.query;

        let filter = {};
        if (year) filter.releaseYear = year;
        if (genre) filter.genre = genre;

        const movies = await Movie.find(filter);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error al filtrar las películas', error });
    }
};


const searchMovie = async (req, res) => {
    try {
        const { name } = req.query;

        const movies = await Movie.find({ name: { $regex: name, $options: 'i' } });
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar la película', error });
    }
};

module.exports = {
    createMovie,
    getMovies,
    getMovieById,
    updateMovieById,
    deleteMovieById,
    filterMovies,
    searchMovie
};
