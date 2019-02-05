import Vue from 'vue';
import App from './App.vue';
import store from './store';
import createRouter from './router';
import pop from './plugin/pop';
import { isLogin } from './javascript/util';

Vue.config.productionTip = false;

export default function createApp() {
  const router = createRouter();
  router.beforeEach((to, from, next) => {
    // 校验登录态
    const islogin = isLogin();
    if (to.name === 'login') {
      if (islogin) {
        next('/');
      } else {
        next();
      }
    } else if (islogin) {
      next();
    } else {
      next('/login');
    }
  });

  const app = new Vue({
    router,
    store,
    pop,
    render: h => h(App),
  });
  return { app, router };
}
