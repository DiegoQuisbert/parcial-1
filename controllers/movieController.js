const Movie = require('../models/movieModel'); 

const addMovie = async (req, res) => {
    const { title, director, genre, premiere, duration, synopsis, poster } = req.body;

    if (!title || !director || !genre || !premiere || !duration || !synopsis || !poster) {
        return res.status(400).json({
            msg: 'Falta información, asegúrate de incluir todos los campos, incluyendo el póster',
            data: { title, director, genre, premiere, duration, synopsis, poster }
        });
    }

    try {
        const newMovie = new Movie({ title, director, genre, premiere, duration, synopsis, poster });
        await newMovie.save();

        res.status(201).json({ msg: 'Película creada exitosamente', data: newMovie });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear la película', error });
    }
};

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener las películas', error });
    }
};

const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);

        if (!movie) {
            return res.status(404).json({ msg: 'Película no encontrada' });
        }

        res.status(200).json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la película', error });
    }
};

const updateMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedMovie) {
            return res.status(404).json({ msg: 'Película no encontrada' });
        }

        res.status(200).json({ msg: 'Película actualizada', data: updatedMovie });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar la película', error });
    }
};


const deleteMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMovie = await Movie.findByIdAndDelete(id);

        if (!deletedMovie) {
            return res.status(404).json({ msg: 'Película no encontrada' });
        }

        res.status(200).json({ msg: 'Película eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar la película', error });
    }
};


const filterMovies = async (req, res) => {
    try {
        const { genre } = req.query;

        const filter = {};
        if (genre) filter.genre = genre;

        const movies = await Movie.find(filter);
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al filtrar las películas', error });
    }
};


const searchMovie = async (req, res) => {
    try {
        const { title } = req.query;

        const movies = await Movie.find({ title: { $regex: title, $options: 'i' } });
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al buscar la película', error });
    }
};

module.exports = {
    addMovie,
    getMovies,
    getMovieById,
    updateMovieById,
    deleteMovieById,
    filterMovies,
    searchMovie
};
