import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import {
  Button,
  DatePicker,
  Drawer,
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
Vue.use(Drawer);
Vue.use(Input);
Vue.use(Popover);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Table);
Vue.use(Tag);

Vue.prototype.$message = message;

axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? "https://api.keyto.top/" : "/api";
axios.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    if (error) {
      // 请求配置发生的错误
      if (!error.response) {
        return console.log("Error", error.message);
      }

      // 获取状态码
      const status = error.response.status;

      // 提示错误信息
      Vue.prototype.$message.error(status, 10);

      // 错误状态处理
      if (status === 401) {
        router.push("/login");
      } else if (status === 403) {
        router.push("/login");
      } else if (status >= 404 && status < 422) {
        router.push("/404");
      }
    }
    return Promise.reject(error);
  }
);
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
