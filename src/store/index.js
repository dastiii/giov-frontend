import Vue from "vue";
import Vuex from "vuex";

import service from "./modules/service";
import layout from "./modules/layout";

Vue.use(Vuex);

const state = {};
const mutations = {};
const getters = {};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  modules: {
    service,
    layout
  },
  plugins: []
});
