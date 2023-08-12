import Vue from "vue";
import Router from "vue-router";
import Login from "../components/Login.vue";
import Signup from "@/components/Signup";
import Dashboard from "../components/Dashboard/index.vue";
import isAuthenticated from "../helpers/isAuthenticated";
import NotFoundView from "../components/NotFoundView.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        isAuth: false
      }
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      meta: {
        isAuth: false
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        isAuth: true
      }
    },
    {
      path: "/404",
      name: "404",
      component: NotFoundView
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/404"
    }
  ],
  mode: "history"
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.isAuth) {
    try {
      let user = await isAuthenticated();
      if (!user) {
        next("/login");
      }
    } catch (error) {
      next("/login");
    }
  }
  next();
});

export default router;
