import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import db from "./db"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth, db
  }
});
