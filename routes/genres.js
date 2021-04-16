const GenreController = require('../controllers').GenreController;

let express = require('express');
let router = express.Router();

router.get('/genres', async (req, res) => {
    const {name} = req.query;

    if (typeof name !== 'undefined') {
        res.json(await GenreController.getByName(name));
    } else {
        res.json(await GenreController.getAll());
    }

});

router.get('/genres/:id', async (req, res) => {
    const genre = await GenreController.getById(req.params.id);
    if (genre === null) {
        res.status(404).json({"error": "Genre not found"});
        return;
    }
    res.json(genre);
});

router.post('/genres', async (req, res) => {
    if (
        req.body.name
    ) {
        const insertedGenre = await GenreController.add(
            req.body.name,
        );

        res.status(201).json(insertedGenre);
    } else {
        res.status(400).end();
    }
});

router.patch('/genres/:id', async (req, res) => {

    if (
        !req.body.name
    ) {
        res.status(400).end();
        return
    }

    const updatedGenre = await GenreController.update(req.params.id, req.body);

    if (updatedGenre[0] === 1) {
        res.json(await GenreController.getById(req.params.id));
        return
    }

    res.status(404).json({'error': "Genre doesn't exist"});
});

router.delete('/genres/:id', async (req, res) => {
    const success = await GenreController.delete(req.params.id);
    if (!success) {
        res.status(404).json({'error': 'Genre not found'});
        return
    }

    res.status(204).json();
});

module.exports = router;
