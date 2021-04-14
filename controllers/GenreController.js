const Genre = require('../models').Genre;

class GenreController
{
    async getAll() {
        return Genre.findAll();
    }

    async getById(id) {
        return Genre.findByPk(id);
    }

    async add(name) {
        try {
            return await Genre.create({
                name,
            });
        } catch (err) {
            console.log(err);
        }
    }

    async update(id, payload) {
        return Genre.update(payload, {
            where: {
                id: id
            }
        });
    }

    async delete(id) {
        return Genre.destroy({
            where: {
                id: id
            }
        });
    }

}

module.exports = new GenreController();
