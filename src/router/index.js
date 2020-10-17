import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },
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
    path: "/table/:station",
    name: "TableStation",
    meta: { layout: "no" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Table.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let isSecured = !to.path.includes('/login')
  let isTable = to.path.includes('/table')

  const token = store.state.auth.user.token;
  if (isSecured && !token && !isTable) {
    return next('/login');
  }
  return next();
})

export default router;
