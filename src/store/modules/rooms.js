import axios from "./../../axios";

// initial state
const state = {
  isLoading: false,
  hasError: false,
  roomsAvailable: null,
  isVisible: true
};

// getters
const getters = {
  getIsLoading: state => state.isLoading,
  getHasError: state => state.hasError,
  isVisible: state => state.isVisible,
  hasRoomsAvailable: state => {
    return state.roomsAvailable;
  }
};

// actions
const actions = {
  close({ commit, state }) {
    if (!state.isVisible) {
      return;
    }

    commit("setIsVisible", false);
  },

  get({ commit, state }) {
    if (state.isLoading) {
      return;
    }

    commit("setIsLoading", true);
    commit("setHasError", false);

    axios
      .get("/api/rooms-available")
      .then(({ data }) => {
        commit("setRoomsAvailable", data.roomsAvailable);
        commit("setIsLoading", false);
      })
      .catch(() => {
        commit("setIsLoading", false);
        commit("setHasError", true);
      });
  }
};

// mutations
const mutations = {
  setRoomsAvailable(state, roomsAvailable) {
    state.roomsAvailable = roomsAvailable;
  },

  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },

  setHasError(state, hasError) {
    state.hasError = hasError;
  },

  setIsVisible(state, isVisible) {
    state.isVisible = isVisible;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
