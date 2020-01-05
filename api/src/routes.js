import multer from 'multer';
import { Router } from 'express';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const router = new Router();
const uploader = multer(multerConfig);

router.post('/users', UserController.store);

router.post('/sessions', SessionController.store);

// rota privada
router.use(authMiddleware);

router.put('/users', UserController.update);

router.post('/files', uploader.single('file'), FileController.store);

export default router;
