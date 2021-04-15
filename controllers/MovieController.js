const Movie = require('../models').Movie;

class MovieController
{
    async getAll() {
        return Movie.findAll({
            include: {all: true},
            attributes: {exclude: ['Genre', 'Producer']},
        });
    }

    async getSortBy(column) {
        return Movie.findAll({
            include: {all: true},
            attributes: {exclude: ['Genre', 'Producer']},
            order: [
                [column, 'ASC'],
            ],
        });
    }

    async getByGenre(genres) {
        const genresIds = genres.map((genre) => {
            return genre.id;
        });
        console.log(genresIds);
        return Movie.findAll({
            include: {all: true},
            attributes: {exclude: ['Genre', 'Producer']},
            where: {
                'GenreId': genresIds
            }
        });
    }

    async getAllPaginated(limit, offset) {
        console.log(limit, offset)
        const movies = await Movie.findAndCountAll({
            include: {all: true},
            attributes: {exclude: ['Genre', 'Producer']},
            limit,
            offset,
        });

        return {
            totalItems: movies.count,
            rows: movies.rows,
            totalPages: Math.ceil(movies.count / limit),
            currentPage: Math.ceil(offset / limit),
        };
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
