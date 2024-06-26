const { User } = require('../models/index.js')

class UserController {
    static async getUserById (req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id, {
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
            });

            if (!user) {
                throw { name: "NotFound" };
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if (!user) {
                throw { name: "NotFound" };
            }

            const editedUser = await user.update(req.body);

            res.status(200).json(editedUser)
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;