import Vue from 'vue'
import VueRouter from 'vue-router'
import Public from './public'
import Private from './private'
Vue.use(VueRouter)

const routes = [...Public, ...Private]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
