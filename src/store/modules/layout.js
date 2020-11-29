const RestaurantLayout = () =>
  import(
    /* webpackChunkName: "layouts/restaurant" */ "../../components/Layouts/Restaurant"
  );
const HotelLayout = () =>
  import(
    /* webpackChunkName: "layouts/hotel" */ "../../components/Layouts/Hotel"
  );
const LoadingLayout = () =>
  import(
    /* webpackChunkName: "layouts/loading" */ "../../components/Layouts/Loading"
  );

// initial state
const state = {
  isNavOpen: false,
  currentLayout: "loading",
  layouts: {
    hotel: HotelLayout,
    restaurant: RestaurantLayout,
    loading: LoadingLayout
  }
};

// getters
const getters = {
  isNavOpen: state => state.isNavOpen,
  currentLayout: state => state.layouts[state.currentLayout]
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
  },
  changeLayout({ commit }, layout) {
    commit("setCurrentLayout", layout);
  }
};

// mutations
const mutations = {
  setIsNavOpen(state, isNavOpen) {
    state.isNavOpen = isNavOpen;
  },
  setCurrentLayout(state, layout) {
    if (layout === state.currentLayout) {
      return;
    }

    state.currentLayout = layout;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
