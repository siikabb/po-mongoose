import express, {Request, Response} from 'express';
import {MessageResponse} from '../types/Messages';
import {postCategory} from './controllers/categoryController';

const router = express.Router();

router.get<{}, MessageResponse>('/', (_req: Request, res: Response) => {
  res.json({
    message: 'api v1',
  });
});

router.use('/categories', postCategory);

export default router;
