import axios from "axios";
const host = document.location.host.split(':')[0]

export default {
  state: {
    user: {
      name: "NO USER",
      token: null,
      id: null
    }
  },
  mutations: {
    setUserData(state, data) {
      state.user.name = data.name;
      state.user.token = data.id;
      state.user.id = data.id;
    },
    clearUserData(state) {
      state.user.name = "NO USER";
      state.user.token = null;
      state.user.id = null;
    }
  },

  actions: {
    async login({ commit }, { login, password }) {
      const result = await axios.post(
        "http://"+host+":3000/api/terminal/users/auth",
        {
          login,
          password
        }
      );


      if (result && result.data && result.data.id) {
        commit("setUserData", result.data);
        return true;
      } else {
        return false;
      }
    }
  }
};
