const MovieController = require('../controllers').MovieController;

let express = require('express');
let router = express.Router();

router.get('/movies', async (req, res) => {
    res.json(await MovieController.getAll());
});

router.get('/movies/:id', async (req, res) => {
    const movie = await MovieController.getById(req.params.id);
    if (movie === null) {
        res.status(404).json({"error": "Movie not found"});
        return;
    }
    res.json(movie);
});

router.post('/movies', async (req, res) => {
    if (
        req.body.title
        && req.body.description
        && req.body.year
        && req.body.producer
        && req.body.genre
    ) {
        const insertedMovie = await MovieController.add(
            req.body.title,
            req.body.description,
            req.body.year,
            req.body.producer,
            req.body.genre
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
        && !req.body.producer
        && !req.body.genre
    ) {
        res.status(400).end();
        return
    }

    const updatedMovie = await MovieController.update(req.params.id, req.body);

    if (updatedMovie[0] === 1) {
        res.json(await MovieController.getById(req.params.id));
        return
    }

    res.status(404).json({'error': "Movie doesn't exist"});
});

router.delete('/movies/:id', async (req, res) => {
    const success = await MovieController.delete(req.params.id);
    if (!success) {
        res.status(404).json({'error': 'Movie not found'});
        return
    }

    res.status(204).json();
});

module.exports = router;
