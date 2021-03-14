// initial state
const state = {
  isNavOpen: false
};

// getters
const getters = {
  isNavOpen: state => state.isNavOpen
};

// actions
const actions = {
  close({ commit }) {
    commit("setIsNavOpen", false);
  },
  open({ commit }) {
    commit("setIsNavOpen", true);
  },
  toggle({ commit, state }) {
    commit("setIsNavOpen", !state.isNavOpen);
  }
};

// mutations
const mutations = {
  setIsNavOpen(state, isNavOpen) {
    state.isNavOpen = isNavOpen;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
