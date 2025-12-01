import { defineStore } from 'pinia';
import { useApi } from '#imports';

export const usePostStore = defineStore('post', {
  state: () => ({
    error: null,
    loading: false,
  }),

  actions: {
    // create post
    async createPost(params) {
      this.loading = true;
      this.error = null;
      const api = useApi();
      try {
        const response = await api.post('/posts/create', params);

        return response;
      } catch (err) {
        const status = err.response?.status;

        if (status === 422) {
          if (err.response?.data?.errors?.title) {
            this.error = {
              message: err.response?.data?.message || 'Validation failed',
              errors: {
                title: err.response?.data?.errors?.title,
              },
            };
          } else {
            this.error = {
              message: err.response?.data?.message || 'Validation failed',
              errors: err.response?.data?.errors || {},
            };
          }
        } else {
          this.error = {
            message: err.message || 'Something went wrong',
            errors: {},
          };
        }
        return null;
      } finally {
        this.loading = false;
      }
    },

    // get posts
    async fetchAllPosts(params = {}){
      this.loading = true
      this.error = null
      const api = useApi()

      try {
        const response = await api.get('/posts', { params })

        return response
      } catch (err) {
        const status = this.err.response?.status

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
        this.loading= false
      }
    },

    // delete post
    async delete(deletePostId) {
      this.loading = true
      this.error = null
      const api = useApi()

      try {
        const response = await api.del(`/posts/${deletePostId}`)
        return response
      } catch(err) {
        this.error = {
          message: err.message || 'Something went wrong',
          errors: {}
        }
      } finally {
        this.loading = false
      }
    },

     // get post detail
    async fetchPostDetail(postId){
      this.loading = true
      this.error = null
      const api = useApi()

      try {
        const response = await api.get(`/posts/${postId}`)

        return response
      } catch (err) {
        const status = this.err.response?.status

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
        this.loading= false
      }
    },

      // update post
      async updatePost(postId, params = {}) {
        this.loading = true
        this.error = null
        const api = useApi()

        try {
          const response = await api.put(`/post/${postId}`,params)

          return response
        } catch (err) {
          const status = this.err.response?.status

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
          this.loading= false
        }
      }
  },
});
