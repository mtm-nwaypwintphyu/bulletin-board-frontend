import { useAuthStore } from '#imports';
import { navigateTo } from '#app';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  const publicRoutes = ['/login', '/create-account', '/forgot-password']; 
  const isPublicRoute = publicRoutes.includes(to.path);


  if (!authStore.token && !isPublicRoute) {
    return navigateTo('/login');
  }
   await authStore.fetchUser()

  if (authStore.token && (to.path === '/login' || to.path === '/create-account')) {
    return navigateTo('/');
  }
});
