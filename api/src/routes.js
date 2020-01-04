import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Yo! Man!#' });
});

export default router;
