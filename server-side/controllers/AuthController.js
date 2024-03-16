const { signToken } = require('../helpers/jwt.js')
const { comparePassword } = require('../helpers/bcrypt.js')
const { User } = require('../models/index.js')
const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client()

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

    static async googleLogin(req, res, next) {
        function generateRandomString(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
          
            for (let i = 0; i < length; i++) {
              result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
          
            return result;
          }
          

          const password = generateRandomString(8);
          console.log(password)
        try {
            const { googleToken } = req.body;

            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: "94685430126-uo9ad5ajqq6044hqhcfq4r0aoqb6egt7.apps.googleusercontent.com"
            })

            if (!ticket) throw { name: "InvalidLogin" };

            const payload = ticket.getPayload();

            let user = await User.findOne({
                where: {
                    email: payload.email
                }
            })


            if (!user) {
                const password = generateRandomString(8)
                user = await User.create({
                    userName: payload.name,
                    email: payload.email,
                    password: password
                })
            }
            const { id, userName, email: userEmail } = user;
            const access_token = signToken({ id: user.id })

            res.status(200).json({ access_token, user: { id, userName, email: userEmail } })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController;