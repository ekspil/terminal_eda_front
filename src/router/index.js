import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "main" },
    component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue")
  },
  {
    path: "/products",
    name: "Products",
    meta: { layout: "main" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Products.vue")
  },
  {
    path: "/items",
    name: "Items",
    meta: { layout: "main" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Items.vue")
  },
  {
    path: "/users",
    name: "Users",
    meta: { layout: "main" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Users.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: { layout: "empty" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
