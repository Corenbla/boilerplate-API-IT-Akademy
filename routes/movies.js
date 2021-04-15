const MovieController = require('../controllers').MovieController;
const ProducerController = require('../controllers').ProducerController;
const GenreController = require('../controllers').GenreController;

let express = require('express');
let router = express.Router();

router.get('/movies', async (req, res) => {
    const genreName = req.query.genre;
    if (typeof genreName === 'undefined') {
        res.json(await MovieController.getAll());
    } else {
        const genre = await GenreController.getByName(genreName);
        if (genre.length === 0) {
            res.status(404).json({ "error": "Genre not found" });
        }
        let test;
        try {
            test = await MovieController.getByGenre(genre);
        }
        catch (e) {
            console.error(e);
        }
        res.json(test);
    }
});

router.get('/movies/:id', async (req, res) => {
    const movie = await MovieController.getById(req.params.id);
    if (movie === null) {
        res.status(404).json({ "error": "Movie not found" });
        return;
    }
    res.json(movie);
});

router.post('/movies', async (req, res) => {
    if (
        req.body.title
        && req.body.description
        && req.body.year
        && req.body.producerId
        && req.body.genreId
    ) {
        const producer = await ProducerController.getById(req.body.producerId)
        const genre = await GenreController.getById(req.body.genreId)

        const insertedMovie = await MovieController.add(
            req.body.title,
            req.body.description,
            req.body.year,
            producer,
            genre,
        );

        res.status(201).json(insertedMovie);
    } else {
        res.status(400).end();
    }
});

router.patch('/movies/:id', async (req, res) => {

    if (
        !req.body.title
        && !req.body.description
        && !req.body.year
        && !req.body.producerId
        && !req.body.genreId
    ) {
        res.status(400).end();
        return
    }

    if (req.body.producerId !== null) {
        req.body.producerId = await ProducerController.getById(req.body.producerId);
    }
    if (req.body.genreId !== null) {
        req.body.genreId = await GenreController.getById(req.body.genreId);
    }

    const updatedMovie = await MovieController.update(req.params.id, req.body);

    if (updatedMovie[0] === 1) {
        res.json(await MovieController.getById(req.params.id));
        return
    }

    res.status(404).json({ 'error': "Movie doesn't exist" });
});

router.delete('/movies/:id', async (req, res) => {
    const success = await MovieController.delete(req.params.id);
    if (!success) {
        res.status(404).json({ 'error': 'Movie not found' });
        return
    }

    res.status(204).json();
});

module.exports = router;
