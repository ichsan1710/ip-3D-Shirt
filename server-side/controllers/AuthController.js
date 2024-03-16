const { signToken } = require('../helpers/jwt.js')
const { comparePassword } = require('../helpers/bcrypt.js')
const { User } = require('../models/index.js')

class AuthController {
    static async register (req, res, next) {
        try {
            const user = await User.create(req.body);

            res.status(201).json({
                userName: user.userName,
                email: user.email,
            })
        } catch (error) {
            next(error);
        }
    }

    static async login (req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email) {
                throw { name: "EmailRequired" };
            }

            if (!password) {
                throw { name: "PassRequired" };
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw { name: "InvalidLogin" };
            }

            const checkPass = comparePassword(password, user.password)
            if (!checkPass) {
                throw { name: "InvalidLogin" };
            }

            const { id, userName, email: userEmail } = user
            const payload = { id: user.id };
            const access_token = signToken(payload);

            res.status(200).json({ access_token, user: { id, userName, email: userEmail } })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController;