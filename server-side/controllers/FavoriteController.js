const { Favorite, User } = require('../models/index.js');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

class FavoriteController {
    static async addFavorite (req, res, next) {
        try {
            req.body.UserId = req.user.id;

            if (!req.file) {
                throw { name: "FileIsRequired" };
            }

            const base64Image = req.file.buffer.toString("base64");
            const base64Url = `data:${req.file.mimetype};base64,${base64Image}`

            const result = await cloudinary.uploader.upload(base64Url, {
                public_id: req.file.originalname,
                folder: "ip_3d_shirt"
            })

            const favorite = await Favorite.create({ imgUrl: result.secure_url });

            res.status(201).json(favorite);
        } catch (error) {
            next(error);
        }
    }

    static async getAllFavoritesByUserId (req, res, next) {
        try {
            const { id } = req.params;

            const favorite = await Favorite.findAll({
                include: User,
                where: {
                    UserId: id
                }
            })

            res.status(200).json(favorite);
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

            res.status(200).json({ message: `successfully remove favorite from my favorites`});
        } catch (error) {
            next(error)
        }
    }
}

module.exports = FavoriteController;