import { defineStore } from "pinia";
import { useApi } from "#imports";

export const usePostStore = defineStore("post", {
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
        const response = await api.post("/posts", params);

        return response;
      } catch (err) {
        this.error = this.normalizeError(err);
        return null;
      } finally {
        this.loading = false;
      }
    },

    // get posts
    async fetchAllPosts(params = {}) {
      this.loading = true;
      this.error = null;
      const api = useApi();

      try {
        const response = await api.get("/posts", { params });

        return response;
      } catch (err) {
        this.error = this.normalizeError(err);
        return null;
      } finally {
        this.loading = false;
      }
    },

    // delete post
    async delete(deletePostId) {
      this.loading = true;
      this.error = null;
      const api = useApi();

      try {
        const response = await api.del(`/posts/${deletePostId}`);
        return response;
      } catch (err) {
        this.error = this.normalizeError(err);
        return null;
      } finally {
        this.loading = false;
      }
    },

    // get post detail
    async fetchPostDetail(postId) {
      this.loading = true;
      this.error = null;
      const api = useApi();

      try {
        const response = await api.get(`/posts/${postId}`);

        return response;
      } catch (err) {
        this.error = this.normalizeError(err);
        return null;
      } finally {
        this.loading = false;
      }
    },

    // update post
    async updatePost(postId, params = {}) {
      this.loading = true;
      this.error = null;
      const api = useApi();

      try {
        const response = await api.patch(`/posts/${postId}`, params);

        return response;
      } catch (err) {
        this.error = this.normalizeError(err);
        return null;
      } finally {
        this.loading = false;
      }
    },

    // import post csv
    async importPostCsv(formData) {
      this.loading = true;
      this.error = null;
      const api = useApi();

      try {
        const response = await api.post("/posts/import", formData);

        return response;
      } catch (err) {
        this.error = this.normalizeError(err);
        return null;
      } finally {
        this.loading = false;
      }
    },

    // export post csv
    async exportPostCsv() {
      this.loading = true;
      this.error = null;
      const api = useApi();

      try {
        const response = await api.download("/posts/export");
        const disposition = response.headers["content-disposition"] || "";
        const match = disposition.match(/filename="?([^";]+)"?/);
        const filename = match ? match[1] : "posts_export.csv";

        return { blob: response.data, filename };
      } catch (err) {
        this.error = await this.normalizeBlobError(err);
        return null;
      } finally {
        this.loading = false;
      }
    },

    normalizeError(err) {
      const status = err.response?.status;
      const data = err.response?.data;
      const message = data?.message || err.message || "Something went wrong";

      if (status === 400 && Array.isArray(data?.errors)) {
        const errors = {};
        for (const item of data.errors) {
          if (!errors[item.field]) errors[item.field] = [];
          errors[item.field].push(item.message);
        }
        return { message: data.message || "Validation failed", errors };
      }

      return { message, errors: {} };
    },

    async normalizeBlobError(err) {
      let message = err.message || "Something went wrong";

      try {
        const blobText = await err.response?.data?.text?.();
        if (blobText) {
          const data = JSON.parse(blobText);
          if (data?.message) message = data.message;
        }
      } catch (e) {
        // keep fallback message
      }

      return { message, errors: {} };
    },

    // get import history
    async fetchAllImportHistory(params) {
      this.loading = true;
      this.error = null;
      const api = useApi();

      try {
        const response = await api.get("/posts/import-histories", { params });

        return response;
      } catch (err) {
        const status = err.response?.status;

        if (status === 403) {
          this.error = {
            message: err.response.data.message || "Forbidden",
            errors: {},
          };
        } else {
          this.error = {
            message: err.message || "Something went wrong",
            errors: {},
          };
        }
        return null;
      } finally {
        this.loading = false;
      }
    },

    // delete history
    async deleteHistory(historyId) {
      this.loading = true;
      this.error = null;
      const api = useApi();

      try {
        const response = await api.del(`/posts/import-histories/${historyId}`);
        return response;
      } catch (err) {
        this.error = {
          message: err.message || "Something went wrong",
          errors: {},
        };
        return null;
      } finally {
        this.loading = false;
      }
    },

    // get post history
    async fetchAllPostHistory(params) {
      this.loading = true;
      this.error = null;
      const api = useApi();

      try {
        const response = await api.get("/posts/post-histories", { params });

        return response;
      } catch (err) {
        const status = err.response?.status;

        if (status === 403) {
          this.error = {
            message: err.response.data.message || "Forbidden",
            errors: {},
          };
        } else {
          this.error = {
            message: err.message || "Something went wrong",
            errors: {},
          };
        }
        return null;
      } finally {
        this.loading = false;
      }
    },
  },
});
