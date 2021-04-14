const Movie = require('../models').Movie;

class MovieController
{
    async getAll() {
        return Movie.findAll();
    }

    async getById(id) {
        return Movie.findByPk(id);
    }

    async add(title, description, year, producer, genre) {
        try {
            return await Movie.create({
                title,
                description,
                year,
                producer,
                genre,
            });
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
