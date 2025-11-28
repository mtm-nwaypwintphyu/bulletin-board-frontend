import { defineStore } from 'pinia'
import { useApi } from '#imports'
import { useCookie, navigateTo } from '#app' 

const TOKEN_COOKIE_NAME = 'auth_token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useCookie(TOKEN_COOKIE_NAME).value || null,
    user: null, 
    loading: false,
    error: null
  }),

  actions: {
    // get profile
    async fetchUser() {
        if (this.user || !this.token) return;

        this.loading = true;
        const api = useApi();
        try {
            const response = await api.get('/user/profile', this.user );
            this.user = response.user; 
        } catch (error) {
            console.error("Failed to fetch user profile, logging out:", error);
        } finally {
            this.loading = false;
        }
    },

    // Register user
    async register(params) {
      this.loading = true
      this.error = null
      const api = useApi()

      try {
        const response = await api.post('/create-account', params)

        return response
      } catch (err) {
        const status = err.response?.status

        if (status === 422) {
          this.error = {
            message: err.response.data.message || 'Validation failed',
            errors: err.response.data.errors || {}
          }
        } else if (status === 409) {
          const conflictField = err.response.data.message.includes('Name') ? 'name' : 'email'
          this.error = {
            message: err.response.data.message || 'Conflict error',
            errors: {
              [conflictField]: [err.response.data.message || 'Conflict']
            }
          }
        } else {
          this.error = {
            message: err.message || 'Something went wrong',
            errors: {}
          }
        }
        return null
      } finally {
        this.loading = false
      }
    },


    // Login user
    async login(email, password, rememberMe) {
      this.loading = true
      this.error = null
      const api = useApi()

      try {
        const response = await api.post('/login', { email, password, rememberMe })
        this.token = response.token
        this.user = response.user

        const tokenCookie = useCookie(TOKEN_COOKIE_NAME, {
            maxAge: rememberMe ? 60 * 60 * 24 * 7 : null
        });
        tokenCookie.value = response.token;
        return response
      } catch (err) {
        this.error = err.response?.data || err.message
      } finally {
        this.loading = false
      }
    },

    // Logout user
    async logout() {
      this.loading = true
      const api = useApi()

      try {
        await api.post('/logout')
      } catch (err) {
        this.error = err.response?.data || err.message
      } finally {
        this.user = null
        this.token = null

        useCookie(TOKEN_COOKIE_NAME).value = null;

        this.loading = false

        await navigateTo('/login')
      }
    },
  }
})
