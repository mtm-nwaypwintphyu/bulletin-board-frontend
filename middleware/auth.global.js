import { useAuthStore } from '#imports'
import { navigateTo } from '#app'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  const publicRoutes = [
    '/login',
    '/create-account',
    '/user/forgot-password',
    '/user/reset-password',
  ]
  const isPublicRoute = publicRoutes.includes(to.path)

  await authStore.fetchUser()

  if (!authStore.isAuthenticated && !isPublicRoute) {
    return navigateTo('/login')
  }

  if (authStore.isAuthenticated && isPublicRoute) {
    return navigateTo('/')
  }
})
