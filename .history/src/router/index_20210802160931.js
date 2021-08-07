import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import LoginPage from "../components/LoginPage.vue";
import SignUp from "../components/SignUp.vue";
import user from "../components/user.vue";
import profile from "../components/profile.vue";
import Account from "../components/Account.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/account/",
    component: Account,
    props: true,
    children: [
      {
        path: "user",
        component: user
      },
      {
        path: "profile",
        component: profile
      }
    ]
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
