import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import home from './home'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState('auth')],
  modules: {
    auth,
    home
  }
})
