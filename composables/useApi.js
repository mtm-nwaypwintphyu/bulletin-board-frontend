import axios from 'axios'
import { useRuntimeConfig, useRoute, navigateTo } from '#app'
import { useAuthStore } from '#imports'

export const useApi = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const route = useRoute()

  const api = axios.create({
    baseURL: config.public.apiBase,
    withCredentials: true,
  })

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const isAuthRequest =
        error.config?.url?.includes('/auth/login') ||
        error.config?.url?.includes('/auth/register') ||
        error.config?.url?.includes('/auth/forgot-password') ||
        error.config?.url?.includes('/auth/reset-password') ||
        error.config?.url?.includes('/auth/change-password')

      if (error.response?.status === 401 && !isAuthRequest) {
        authStore.clearAuth()
        if (route.path !== '/login') {
          try {
            await navigateTo('/login')
          } catch (e) {
          }
        }
      }
      return Promise.reject(error)
    }
  )

  const get = async (url, options = {}) => (await api.get(url, options)).data
  const post = async (url, data, options = {}) => (await api.post(url, data, options)).data
  const put = async (url, data, options = {}) => (await api.put(url, data, options)).data
  const patch = async (url, data, options = {}) => (await api.patch(url, data, options)).data
  const del = async (url, options = {}) => (await api.delete(url, options)).data
  const download = async (url, options = {}) => await api.get(url, { responseType: 'blob', ...options })

  return { get, post, put, patch, del, download }
}
