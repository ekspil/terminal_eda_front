import axios from "axios";

export default {
  state: {
    items: [],
    user: {
      name: "NO USER",
      token: null
    }
  },
  mutations: {
    setItems(state, data) {
      state.items = data
    },
  },
  getters: {
    getItems(state){
      return state.items
    }
  },
  actions: {
    async getAllUsers({ dispatch, commit }, { password }) {
      try {
        const result = await axios.get("http://localhost:3000/api/terminal/users/get");
        commit('setItems', result.data)
        return result.data
      } catch (e) {
        console.log(dispatch, commit, password);
        throw e;
      }
    },
    async getAllItems({ dispatch, commit }, { password }) {
      try {
        const result = await axios.get("http://localhost:3000/api/terminal/items/get");
        return result.data
      } catch (e) {
        console.log(dispatch, commit, password);
        throw e;
      }
    },
    async getAllGroups({ dispatch, commit }, { password }) {
      try {
        const result = await axios.get("http://localhost:3000/api/terminal/groups/get");
        return result.data
      } catch (e) {
        console.log(dispatch, commit, password);
        throw e;
      }
    },
    async getAllProducts({ dispatch, commit }, { password }) {
      try {
        const result = await axios.get("http://localhost:3000/api/terminal/products/get");
        return result.data
      } catch (e) {
        console.log(dispatch, commit, password);
        throw e;
      }
    },
    async saveProduct(store, data) {
      try {
        await axios.post("http://localhost:3000/api/terminal/products/save", data);
        return true
      } catch (e) {
        console.log(e);
        return false
      }
    },
    async saveItem(store, data) {
      try {
        await axios.post("http://localhost:3000/api/terminal/items/save", data);
        return true
      } catch (e) {
        console.log(e);
        return false
      }
    },
    async saveUser(store, data) {
      try {
        await axios.post("http://localhost:3000/api/terminal/users/save", data);
        return true
      } catch (e) {
        console.log(e);
        return false
      }
    },
  }
};
