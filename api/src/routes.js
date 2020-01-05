import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const router = new Router();

router.post('/users', UserController.store);

router.post('/sessions', SessionController.store);

export default router;
