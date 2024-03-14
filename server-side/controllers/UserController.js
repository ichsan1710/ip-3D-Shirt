const { User } = require('../models/index.js')

class UserController {
    static async updateUser(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if (!user) {
                throw { name: "NotFound" };
            }

            const editedUser = await user.update(req.body);

            res.status(200).json({message: `User ${editedUser.userName} has been updated`})
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;