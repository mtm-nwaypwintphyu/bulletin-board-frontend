import { defineStore } from 'pinia'
import { useApi } from '#imports'
import { navigateTo } from '#app'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => state.user !== null,
    isAdmin: (state) => state.user?.type === 'ADMIN',
  },

  actions: {
    clearAuth() {
      this.user = null
      this.error = null
    },

    async fetchUser() {
      if (this.loading) return null

      this.loading = true
      const api = useApi()
      try {
        const response = await api.get('/auth/me')
        this.user = response.data
        return this.user
      } catch (error) {
        if (error.response?.status === 401) {
          this.user = null
        }
        return null
      } finally {
        this.loading = false
      }
    },

    // Register user
    async register(params) {
      this.loading = true
      this.error = null
      const api = useApi()

      const payload = { ...params }
      delete payload.password_confirmation
      delete payload.confirm_password

      try {
        const response = await api.post('/auth/register', payload)
        return response
      } catch (err) {
        this.error = this.normalizeError(err)
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
        const response = await api.post('/auth/login', { email, password, rememberMe })
        this.user = response.data.user
        return response
      } catch (err) {
        this.error = this.normalizeError(err)
        return null
      } finally {
        this.loading = false
      }
    },

    // Logout user
    async logout() {
      this.loading = true
      const api = useApi()

      try {
        await api.post('/auth/logout')
      } catch (err) {
        // ignore logout errors, always clear local state
      } finally {
        this.clearAuth()
        this.loading = false
        await navigateTo('/login')
      }
    },

    normalizeError(err) {
      const status = err.response?.status
      const data = err.response?.data
      const message = data?.message || err.message || 'Something went wrong'

      if (status === 400 || status === 409) {
        const conflictField = message.toLowerCase().includes('name') ? 'name' : 'email'
        return {
          message,
          errors: { [conflictField]: [message] },
        }
      }

      if (status === 422) {
        return {
          message: data?.message || 'Validation failed',
          errors: this.groupErrors(data?.errors || []),
        }
      }

      return {
        message,
        errors: {},
      }
    },

    groupErrors(validationErrors) {
      const grouped = {}
      for (const item of validationErrors || []) {
        if (!grouped[item.field]) grouped[item.field] = []
        grouped[item.field].push(item.message)
      }
      return grouped
    },
  }
})
