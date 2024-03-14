const { Favorite } = require('../models/index.js');

class FavoriteController {
    static async addFavorite (req, res, next) {
        try {
            req.body.UserId = req.user.id;

            const favorite = await Favorite.create(req.body);

            res.status(201).json(favorite);
        } catch (error) {
            next(error);
        }
    }

    static async deleteFavorite (req, res, next) {
        try {
            const { id } = req.params;

            const favorite = Favorite.findByPk(id);

            if (!favorite) {
                throw { name: "NotFound" };
            }

            await favorite.destroy();

            res.status(200).json({ message: `successfully remove favorite from my favorites`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = FavoriteController;