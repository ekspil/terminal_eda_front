const state = () => ({
  bill: null
});

const getters = {
  getBill: state => state.bill
};

const mutations = {
  setBill(state, bill) {
    state.bill = bill;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
