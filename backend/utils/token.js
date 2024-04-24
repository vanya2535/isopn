import jwt from 'jsonwebtoken';
import config from '../config.js';

export const generateAccessToken = ({ _id, email }) => jwt.sign({ _id, email }, config.SECRET_KEY, { expiresIn: '1m' });
export const generateRefreshToken = _id => jwt.sign({ _id }, config.SECRET_KEY, { expiresIn: '2d' });

export function verifyToken(token) {
    try {
        const decodedData = jwt.verify(token, config.SECRET_KEY);

        return {
            decodedData,
            expired: false,
        };
    } catch (e) {
        return {
            expired: e instanceof jwt.TokenExpiredError,
        };
    }
}
