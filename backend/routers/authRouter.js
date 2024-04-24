import Router from 'express';
import { check } from 'express-validator';
import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

router.post('/register', [
    check('email', 'Введите корректный email').isEmail(),
    check('password', 'Минимальная длина пароля - 8 знаков').isLength({ min: 8 }),
    check('password', 'Максимальная длина пароля - 16 знаков').isLength({ max: 16 }),
], authController.register);

router.get('/confirm', authController.confirm);

router.post('/login', [
    check('email', 'Введите корректный email').isEmail(),
    check('password', 'Минимальная длина пароля - 8 знаков').isLength({ min: 8 }),
    check('password', 'Максимальная длина пароля - 16 знаков').isLength({ max: 16 }),
], authController.login);

router.post('/restore', [
    check('email', 'Введите корректный email').isEmail(),
], authController.restore);

router.post('/restore-confirm', [
    check('password', 'Минимальная длина пароля - 8 знаков').isLength({ min: 8 }),
    check('password', 'Максимальная длина пароля - 16 знаков').isLength({ max: 16 }),
], authController.restoreConfirm);

router.get('/check', [
    authMiddleware,
], authController.check);

export default router;
