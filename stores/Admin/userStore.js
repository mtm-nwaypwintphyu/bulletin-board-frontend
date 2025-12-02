import { defineStore } from 'pinia'
import { useApi } from '#imports'
import { useCookie } from '#app' 

const TOKEN_COOKIE_NAME = 'auth_token'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: useCookie(TOKEN_COOKIE_NAME).value,
    user: null, 
    loading: false,
    error: null
  }),

  actions: {
    // get all users
    async fetchAllUsers(params = {}) {
      this.loading = true
      this.error = null
      const api = useApi()

      try {
        const response = await api.get('/users',{ params })

        return response
      } catch (err) {
        const status = err.response?.status

         if (status === 403) {
          this.error = {
            message: err.response.data.message || 'Forbidden',
            errors: {}
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

    // update user
    async update(params) {
      this.loading = true
      this.error = null
      const api = useApi()
      try {
        const response = await api.put('/user/update', params)
        
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
    // delete user
    async delete(deleteUserId) {
      this.loading = true
      this.error = null
      const api = useApi()

      try {
        const response = await api.del(`/users/${deleteUserId}`)
        return response
      } catch (err) {
        this.error = {
          message: err.message || 'Something went wrong',
          errors: {}
        }
      }finally {
        this.loading = false
      }
    },
    // upload user csv
    async uploadCsv(formData) {
      this.loading = true;
      this.error = null;
      const api = useApi();

      try {
        const response = await api.post('/users/import', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response;
      } catch (err) {
          this.error = {
            message: 'Validation failed',
            errors: {},
        }
        return null;
      } finally {
        this.loading = false;
      }
    }

  }
})
