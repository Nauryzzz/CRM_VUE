import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./auth"
import info from "./info"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    async fetchCurrency() {
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.VUE_APP_FIXER}&symbols=USD,EUR,RUB,KZT`);
      return await res.json();
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth,
    info
  }
})
