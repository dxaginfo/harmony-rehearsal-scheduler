import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import groupRoutes from './group.routes';
import rehearsalRoutes from './rehearsal.routes';
import attendanceRoutes from './attendance.routes';
import locationRoutes from './location.routes';
import resourceRoutes from './resource.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/groups', groupRoutes);
router.use('/rehearsals', rehearsalRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/locations', locationRoutes);
router.use('/resources', resourceRoutes);

export default router;
