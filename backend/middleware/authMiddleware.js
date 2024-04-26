import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/token.js';

export default async function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const { accessToken, refreshToken } = req.cookies;

        if (!accessToken) {
            return res.status(403).json({ message: 'Пользователь не авторизован' });
        }

        const accessTokenData = verifyToken(accessToken);
        if (accessTokenData.expired) {
            const refreshTokenData = verifyToken(refreshToken);
            if (refreshTokenData.expired) {
                return res.status(403).json({ message: 'Пользователь не авторизован' });
            }

            const user = await User.findOne({ refreshToken });
            if (!user) {
                return res.status(403).json({ message: 'Пользователь не авторизован' });
            }

            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user._id);

            req.user = {
                _id: user._id,
                email: user.email,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };

            user.refreshToken = newRefreshToken;
            await user.save();

            next();
        } else {
            req.user = {
                _id: accessTokenData.decodedData._id,
                email: accessTokenData.decodedData.email,
                accessToken,
                refreshToken,
            };

            next();
        }
    } catch (e) {
        console.log(e);
        return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
}
