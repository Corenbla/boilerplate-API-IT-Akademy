const {Model} = require('sequelize');

const Movie = require('../models').Movie;
const Genre = require('../models').Genre;
const Producer = require('../models').Producer;

class MovieController
{
    async getAll() {
        return await Movie.findAll({
            include: {all: true},
            attributes: {exclude: ['Genre', 'Producer']},
        });
    }

    async getById(id) {
        return Movie.findByPk(id, {
            include: {all: true},
            attributes: {exclude: ['Genre', 'Producer']},
        });
    }

    async add(title, description, year, producer, genre) {
        try {
            const movie = await Movie.create({
                title,
                description,
                year,
            });

            await movie.setGenre(genre);
            await movie.setProducer(producer);
            movie.save();

            return movie;
        } catch (err) {
            console.log(err);
        }
    }

    async update(id, payload) {
        return Movie.update(payload, {
            where: {
                id: id
            }
        });
    }

    async delete(id) {
        return Movie.destroy({
            where: {
                id: id
            }
        });
    }

}

module.exports = new MovieController();
