import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import db from "./db"
import order from "./order"
import kassa from "./kassa"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [createPersistedState()],
  modules: {
    auth, db, order, kassa
  }
});
