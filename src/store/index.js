import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 存储用户权限信息
    roles: [],
  },
  mutations: {
    setRoles(state, { roles }) {
      state.roles = roles;
    },
  },
  actions: {
    setRoles: ({ commit }, { roles }) => {
      commit("addRoles", { roles });
    },
  },
  modules: {},
});
