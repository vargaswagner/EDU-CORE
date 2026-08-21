// src/routes/index.js

import { Router } from 'express';

import { createAuthRoutes } from '../modules/auth/infrastructure/routes/auth.routes.js';

import {
  authController,
  authenticationMiddleware,
} from '../container/index.js';

const router = Router();

// ==========================================
// AUTH
// ==========================================

const authRoutes = createAuthRoutes({
  authController,
  authenticationMiddleware,
});

router.use('/auth', authRoutes);

export const routes = router;
