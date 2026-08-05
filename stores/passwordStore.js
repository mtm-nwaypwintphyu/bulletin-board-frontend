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
        const response = await api.post('/auth/change-password', {
          currentPassword: params.currentPassword,
          newPassword: params.newPassword,
        })

        return {
          success: true,
          message: response.message || 'Password updated successfully!',
        }
      } catch (err) {
        return {
          success: false,
          message: err.response?.data?.message || 'Something went wrong.',
          errors: this.groupValidationErrors(err),
        }
      } finally {
        this.loading = false
      }
    },

    async forgot(email) {
      this.loading = true
      this.error = null

      const api = useApi()

      try {
        const response = await api.post('/auth/forgot-password', { email })

        return {
          success: true,
          message: response.message || 'Password reset link sent successfully!',
        }
      } catch (err) {
        return {
          success: false,
          message: err.response?.data?.message || 'Something went wrong while sending the reset link.',
          errors: this.groupValidationErrors(err),
        }
      } finally {
        this.loading = false
      }
    },

    async reset(params) {
      this.loading = true
      this.error = null

      const api = useApi()

      try {
        const response = await api.post(
          `/auth/reset-password?token=${encodeURIComponent(params.token)}`,
          { password: params.password },
        )

        return {
          success: true,
          message: response.message || 'Password reset successfully!',
        }
      } catch (err) {
        return {
          success: false,
          message: err.response?.data?.message || 'The token is invalid or expired.',
          errors: this.groupValidationErrors(err),
        }
      } finally {
        this.loading = false
      }
    },

    groupValidationErrors(err) {
      const status = err.response?.status
      const data = err.response?.data
      const errors = {}

      if (status === 422) {
        for (const item of data?.errors || []) {
          if (!errors[item.field]) errors[item.field] = []
          errors[item.field].push(item.message)
        }
        return errors
      }

      if (status === 400 || status === 401) {
        const field = data?.message?.toLowerCase().includes('token')
          ? 'token'
          : data?.message?.toLowerCase().includes('current')
            ? 'currentPassword'
            : 'email'
        errors[field] = [data?.message]
      }

      return errors
    },
  }
})
