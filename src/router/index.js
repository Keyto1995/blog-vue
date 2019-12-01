import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/articles/:id",
    name: "article",
    component: () =>
      import(/* webpackChunkName: "article" */ "../views/Article.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/manager/articles",
    name: "articleManager",
    component: () =>
      import(
        /* webpackChunkName: "articleManager" */ "../views/ArticleManager.vue"
      ),
    meta: { roles: ["AUTHOR"] },
  },
  {
    path: "/manager/tags",
    name: "tagManager",
    component: () =>
      import(/* webpackChunkName: "tagManager" */ "../views/TagManager.vue"),
    meta: { roles: ["ADMIN"] },
  },
  {
    path: "/tags/:id",
    name: "tag",
    component: () => import(/* webpackChunkName: "tag" */ "../views/Tag.vue"),
  },
  {
    path: "/editor",
    name: "editor",
    component: () =>
      import(/* webpackChunkName: "editor" */ "../views/Editor.vue"),
    meta: { roles: ["ADMIN", "AUTHOR"] },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    next();
    return;
  }
  let needRoles = to.matched[0].meta.roles;
  if (!needRoles || needRoles.length === 0) {
    next();
  } else {
    let roles = router.app.$options.store.state.roles;
    if (roles.length === 0) {
      next("/login");
    } else {
      if (needRoles.filter(v => roles.includes(v)).length === 0) {
        next("/login");
      } else {
        next();
      }
    }
  }
});

export default router;
