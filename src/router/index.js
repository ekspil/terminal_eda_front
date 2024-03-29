import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
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
    path: "/corners",
    name: "Corners",
    meta: { layout: "main" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Corners.vue")
  },
  {
    path: "/items",
    name: "Items",
    meta: { layout: "main" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Items.vue")
  },
  {
    path: "/groups",
    name: "Groups",
    meta: { layout: "main" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Groups.vue")
  },
  {
    path: "/mods",
    name: "Mods",
    meta: { layout: "main" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Mods.vue")
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
  },
  {
    path: "/tabAdm",
    name: "TableAdmin",
    meta: { layout: "main" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Table.vue")
  },
  {
    path: "/table",
    name: "Table",
    meta: { layout: "no" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Table.vue")
  },
  {
    path: "/table/:corner/:station",
    name: "TableStation",
    meta: { layout: "no" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Table.vue")
  },
  {
    path: "/tableItems",
    name: "TableItemStation",
    meta: { layout: "no" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/TableItems.vue")
  },
  {
    path: "/tabAdmItems",
    name: "TableItemStationAdm",
    meta: { layout: "main" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/TableItems.vue")
  },
  {
    path: "/tableItems/:station",
    name: "TableItemStationStation",
    meta: { layout: "no" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/TableItems.vue")
  },
  {
    path: "/admeo",
    name: "AdminEo",
    meta: { layout: "main" },
    component: () => import(/* webpackChunkName: "about" */ "../views/Eo.vue")
  },
  {
    path: "/eo/:corner",
    name: "Eo",
    meta: { layout: "no" },
    component: () => import(/* webpackChunkName: "about" */ "../views/Eo.vue")
  },
  {
    path: "/eoterminal/",
    name: "EoTerminal",
    meta: { layout: "no" },
    component: () => import(/* webpackChunkName: "about" */ "../views/EoTerminal.vue")
  },
  {
    path: "/kassa/:corner",
    name: "Kassa",
    meta: { layout: "no" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Kassa.vue")
  },
  {
    path: "/kassaSecondScreen",
    name: "SecondScreen",
    meta: { layout: "no" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SecondScreen.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let isSecured = !to.path.includes("/login");
  let isTable = to.path.includes("/table");

  const token = store.state.auth.user.token;
  if (isSecured && !token && !isTable) {
    return next("/login");
  }
  return next();
});

export default router;
