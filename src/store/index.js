import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
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
    setRoles: (context, { roles }) => {
      context.commit("setRoles", { roles });
    },
  },
  modules: {},
});

// 在页面加载时读取sessionStorage里的状态信息
if (sessionStorage.getItem("store")) {
  store.replaceState(
    Object.assign({}, store.state, JSON.parse(sessionStorage.getItem("store")))
  );
}

export default store;
