import axios from "./../../axios";

// initial state
const state = {
  isLoading: false,
  hasError: false,
  services: []
};

// getters
const getters = {
  getServices: state => state.services,
  getIsLoading: state => state.isLoading,
  getHasError: state => state.hasError,
  isAnkaufActive: state => {
    let ankaufshotline = state.services.find(
      service => service.name === "Ankauf"
    );

    if (ankaufshotline && ankaufshotline !== "undefined") {
      return ankaufshotline.timeclocks.length > 0;
    }

    return false;
  }
};

// actions
const actions = {
  get({ commit, state }) {
    if (state.isLoading) {
      return;
    }

    commit("setIsLoading", true);
    commit("setHasError", false);

    axios
      .get("services")
      .then(({ data }) => {
        commit("setServices", data);
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
  setServices(state, services) {
    state.services = services;
  },

  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },

  setHasError(state, hasError) {
    state.hasError = hasError;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
