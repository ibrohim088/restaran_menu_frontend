// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'
import { authGuard } from './guard.js'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(authGuard)

export default router