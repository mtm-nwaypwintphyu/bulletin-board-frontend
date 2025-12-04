import { defineStore } from 'pinia'
import { useApi } from '#imports'

export const usePasswordStore = defineStore('password', {
  state: () => ({
    loading: false,
    error: null,
  }),

  actions: {
    async change(params) {
      this.loading = true
      this.error = null

      const api = useApi()

      try {
        const response = await api.post('/password/change', params)
        if (response.success) {
          return {
            success: true,
            message: response.message || 'Password updated successfully!'
          }
        }

        return {
          success: false,
          message: response.message || 'Something went wrong.'
        }

      } catch (err) {
        const status = err.response?.status
        const res = err.response?.data

        if (status === 422) {
          return {
            success: false,
            message: res?.message || 'Validation failed',
            errors: res?.errors || {}
          }
        }

        if (status === 400) {
          return {
            success: false,
            message: res?.message,
            errors: {
              current_password: [res?.message]
            }
          }
        }

        return {
          success: false,
          message: err?.message || 'Something went wrong.'
        }

      } finally {
        this.loading = false
      }
    },

    async forgot(email) {
      this.loading = true;
      this.error = null;

      const api = useApi();

      try {
        const response = await api.post('/password/forgot', { email });

        if (response.success) {
          return {
            success: true,
            message: response.message || 'Password reset link sent successfully!'
          };
        }

        return {
          success: false,
          message: response.message || 'Something went wrong while sending the reset link.'
        };

      } catch (err) {
        const status = err.response?.status;
        const res = err.response?.data;

        if (status === 422) {
          return {
            success: false,
            message: res?.message || 'Validation failed.',
            errors: res?.errors || {}
          };
        }

        if (status === 400) {
          return {
            success: false,
            message: res?.message || 'Invalid request.',
            errors: {
              email: [res?.message]
            }
          };
        }

        return {
          success: false,
          message: err?.message || 'Something went wrong.'
        };

      } finally {
        this.loading = false;
      }
    },

    async reset(params) {
      this.loading = true
      this.error = null

      const api = useApi()

      try {
        const response = await api.post('/password/reset', params)

        return {
          success: true,
          message: response.message || 'Password reset successfully!'
        }

      } catch (err) {
        const status = err.response?.status
        const res = err.response?.data

        if (status === 422) {
          return {
            success: false,
            message: res?.message || 'Validation failed.',
            errors: res?.errors || {}
          }
        }

        if (status === 400) {
          return {
            success: false,
            message: res?.message || 'The token is invalid or expired.',
            errors: {
              token: [res?.message]
            }
          }
        }

        return {
          success: false,
          message: err?.message || 'Something went wrong.'
        }

      } finally {
        this.loading = false
      }
    }
  }
})
