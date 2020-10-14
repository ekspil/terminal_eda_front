import axios from "axios";

export default {
  state: {
    user: {
      name: "NO USER",
      token: null
    }
  },
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        const result = await axios.get("https://reqres.in/api/users?page=2");
        console.log(result);
      } catch (e) {
        console.log(dispatch, commit, email, password);
        throw e;
      }
    }
  }
};
