import { Router } from 'express';
import UserController from './app/controllers/UserController';

const router = new Router();

router.post('/users', UserController.store);

export default router;
