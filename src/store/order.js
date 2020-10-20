import axios from "axios";

export default {
  state: {
  },
  actions: {
    async getOrders({ dispatch, commit }) {
      try {
        const result = await axios.get("http://localhost:3000/api/terminal/order/all");
        return result.data
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async updateOrder({ dispatch, commit }, data) {
      try {
        const result = await axios.post("http://localhost:3000/api/terminal/order/change", data);
        return result.data
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async setReadyItem({ dispatch, commit }, data) {
      try {
        const result = await axios.post("http://localhost:3000/api/terminal/order/setReadyItem", data);
        return result.data
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async setDieItem({ dispatch, commit }, data) {
      try {
        const result = await axios.post("http://localhost:3000/api/terminal/order/setDieItem", data);
        return result.data
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async getItems({ dispatch, commit }) {
      try {
        const result = await axios.get("http://localhost:3000/api/terminal/order/allItems");
        return result.data
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
  }
};
