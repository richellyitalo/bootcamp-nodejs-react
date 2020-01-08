import multer from 'multer';
import { Router } from 'express';
import UserController from './app/controllers/UserController';
import ProviderController from './app/controllers/ProviderController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

const router = new Router();
const uploader = multer(multerConfig);

router.post('/users', UserController.store);

router.post('/sessions', SessionController.store);

// rota privada
router.use(authMiddleware);

router.put('/users', UserController.update);

router.get('/appointments', AppointmentController.index);
router.post('/appointments', AppointmentController.store);
router.delete('/appointments/:id', AppointmentController.delete);

router.get('/providers/:providerId/available', AvailableController.index);

router.get('/schedules', ScheduleController.index);

router.get('/notifications', NotificationController.index);
router.put('/notifications/:id', NotificationController.update);

router.post('/files', uploader.single('file'), FileController.store);

router.get('/providers', ProviderController.index);

export default router;
