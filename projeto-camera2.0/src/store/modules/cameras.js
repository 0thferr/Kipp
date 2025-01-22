// store/modules/cameras.js
import { cameras } from '@/config/streams';

export default {
  namespaced: true,
  
  state: () => ({
    list: cameras,
    loading: false,
    error: null
  }),

  getters: {
    getCameraById: (state) => (id) => {
      return state.list.find(camera => camera.id === id);
    }
  },

  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    UPDATE_CAMERA(state, updatedCamera) {
      const index = state.list.findIndex(camera => camera.id === updatedCamera.id);
      if (index !== -1) {
        state.list[index] = updatedCamera;
      }
    }
  },

  actions: {
    async fetchCameras({ commit }) {
      commit('SET_LOADING', true);
      try {
        // In a real application, you would fetch cameras from an API
        // For now, we're using the static config
        commit('SET_LOADING', false);
      } catch (error) {
        commit('SET_ERROR', error.message);
        commit('SET_LOADING', false);
      }
    }
  }
};