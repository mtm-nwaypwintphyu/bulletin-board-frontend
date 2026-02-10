import axios from 'axios'
import { useRuntimeConfig } from '#app'
import { useAuthStore } from '#imports'
import { useCookie } from '#app'

export const useApi = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const api = axios.create({
    baseURL: config.public.apiBase,
    withCredentials: true,
  })

  api.interceptors.request.use((request) => {
    if (authStore.token) {
      request.headers.Authorization = `Bearer ${authStore.token}`
    }
    return request
  })

  api.interceptors.response.use(
    (response) => response,
    // handle infinite logout call
     async (error) => {
      const loginUrl = '/login';
      
      if (error.response?.status === 401 && error.config.url !== loginUrl) {
        useCookie(TOKEN_COOKIE_NAME).value = null;
        await authStore.logout();
      }
      return Promise.reject(error);
    }
  )

  const get = async (url, options = {}) => (await api.get(url, options)).data
  const post = async (url, data, options = {}) => (await api.post(url, data, options)).data
  const put = async (url, data, options = {}) => (await api.put(url, data, options)).data
  const del = async (url, options = {}) => (await api.delete(url, options)).data

  return { get, post, put, del }
}
