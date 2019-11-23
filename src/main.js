import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";

import {
  Button,
  DatePicker,
  Input,
  message,
  Popover,
  Radio,
  Select,
  Table,
  Tag,
} from "ant-design-vue";

import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;

// 注册antd组件
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Input);
Vue.use(Popover);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Table);
Vue.use(Tag);

Vue.prototype.$message = message;

axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? "https://api.keyto.top/" : "/api";
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
