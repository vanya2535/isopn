import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import config from '../config.js';
import User from '../models/User.js';


const generateAccessToken = id => jwt.sign({ id }, config.secret, { expiresIn: '24h' });

class AuthController {
    async register(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const { username, password } = req.body;
            const candidate = await User.findOne({ username });

            if (candidate) {
                return res
                    .status(400)
                    .json({ message: 'Пользователь с таким именем уже зарегистрирован' });
            }

            const hashPassword = bcrypt.hashSync(password, 7);

            const user = new User({
                username,
                password: hashPassword,
            });

            await user.save();

            const token = generateAccessToken(user._id);

            return res.json({
                token,
                user: {
                    id: user._id,
                    username,
                },
            });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе регистрации' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({ message: 'Неверный пароль' });
            }

            const token = generateAccessToken(user._id);

            return res.json({
                token,
                user: {
                    id: user._id,
                    username,
                },
            });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'Ошибка в процессе входа' });
        }
    }

    async getData(req, res) {
        try {
            const { token } = req.query;

            if (!token) {
                return res.status(403).json({ message: 'Пользователь не авторизован' });
            }

            const { id } = jwt.verify(token, config.secret);

            const user = await User.findById(id);

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }

            return res.status(200).json({
                token,
                user: {
                    id: user._id,
                    username: user.username,
                },
            });
        } catch (e) {
            console.log(e);
            return res
                .status(400)
                .json({ message: 'Ошибка в процессе получения данных' });
        }
    }
}

export default new AuthController();
