import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ApiService from './services/api.service'
import MockService from './services/mock.service'

Vue.config.productionTip = false
// Api Service Initialization
ApiService.init();
// Mock Database Login Initialization
MockService.init()

router.beforeEach((to, from, next) => {
  if (!store.state.auth.isAuthenticated && to.name !== 'login') {
    next('/')
    return;
  } 
  if (store.state.auth.isAuthenticated && (to.path === '/login' || to.path ==='/')) {
    next('/home')
    return;
  }
  next();
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
