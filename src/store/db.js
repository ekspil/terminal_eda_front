import axios from "axios";

export default {
  state: {
    user: {
      name: "NO USER",
      token: null
    }
  },
  actions: {
    async getAllUsers({ dispatch, commit }, { password }) {
      try {
        const result = await axios.get("http://localhost:3000/api/terminal/users/get");
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
  }
};
