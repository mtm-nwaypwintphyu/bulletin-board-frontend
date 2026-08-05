import { defineStore } from 'pinia'
import { useApi } from '#imports'

export const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,
    error: null,
  }),

  actions: {
    // get all users
    async fetchAllUsers(params = {}) {
      this.loading = true
      this.error = null
      const api = useApi()

      try {
        const response = await api.get('/users', { params })
        return response
      } catch (err) {
        this.error = this.normalizeError(err)
        return null
      } finally {
        this.loading = false
      }
    },

    // get user by id
    async getById(id) {
      this.loading = true
      this.error = null
      const api = useApi()

      try {
        const response = await api.get(`/users/${id}`)
        return response
      } catch (err) {
        this.error = this.normalizeError(err)
        return null
      } finally {
        this.loading = false
      }
    },

    // create user
    async create(userData) {
      this.loading = true
      this.error = null
      const api = useApi()

      try {
        const response = await api.post('/users', this.toFormData(userData))
        return response
      } catch (err) {
        this.error = this.normalizeError(err)
        return null
      } finally {
        this.loading = false
      }
    },

    // update user
    async update(id, userData) {
      this.loading = true
      this.error = null
      const api = useApi()

      try {
        const response = await api.patch(`/users/${id}`, this.toFormData(userData))
        return response
      } catch (err) {
        this.error = this.normalizeError(err)
        return null
      } finally {
        this.loading = false
      }
    },

    // delete user
    async delete(deleteUserId) {
      this.loading = true
      this.error = null
      const api = useApi()

      try {
        const response = await api.del(`/users/${deleteUserId}`)
        return response
      } catch (err) {
        this.error = this.normalizeError(err)
        return null
      } finally {
        this.loading = false
      }
    },

    toFormData(data) {
      const formData = new FormData()

      for (const [key, value] of Object.entries(data)) {
        if (value === undefined || value === null || value === '') continue
        if (key === 'profile') {
          if (value instanceof File || value instanceof Blob) formData.append(key, value)
          continue
        }
        if (key === 'password_confirmation') continue
        formData.append(key, value)
      }

      return formData
    },

    normalizeError(err) {
      const status = err.response?.status
      const data = err.response?.data

      if (status === 403) {
        return {
          message: data?.message || 'Forbidden',
          errors: {},
        }
      }

      if (status === 422) {
        const errors = {}
        for (const item of data?.errors || []) {
          if (!errors[item.field]) errors[item.field] = []
          errors[item.field].push(item.message)
        }
        return {
          message: data?.message || 'Validation failed',
          errors,
        }
      }

      const message = data?.message || err.message || 'Something went wrong'
      const conflictField = message.toLowerCase().includes('name') ? 'name' : 'email'
      return {
        message,
        errors: status === 409 ? { [conflictField]: [message] } : {},
      }
    },
  }
})
