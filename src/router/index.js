import VueRouter from 'vue-router';
import Vue from 'vue';
import routes from './routes';
import store from "../store"

Vue.use(VueRouter);

let router = new VueRouter(routes);

router.afterEach(() => {
  store.dispatch("layout/close");
});

export default router;
