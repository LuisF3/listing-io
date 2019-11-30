import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AllLists from '@/components/AllLists.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/signup",
    component: () => import("../views/Signup.vue")
  },
  {
    path: "/private",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Private.vue"),
    children: [
      { path: "/", component: AllLists },
      { path: "/:listId", component: AllLists }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
