/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-18 09:48:01
 */
import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import routerData from './router/'
import role from './role/'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: Cookies.get('token')
  },
  mutations: {
    setToken (state, token) {
		if (token) {
			state.token = token.username
			Cookies.set('token', token.username ,{ expires: 1/24 })
			sessionStorage.setItem('info', JSON.stringify(token))
			//console.log(1111)
		} else {
			state.token = null
			Cookies.remove('token')
			sessionStorage.removeItem('info')
		}
		//console.log(state.token)
    }
  },
  actions: {
    setToken ({commit}, token) {
      return new Promise((resolve, reject) => {
        commit('setToken', token)
        resolve()
      })
    }
  },
  getters: {
    token: state => state.token,
    info: state => state.role.info,
    addRouters: state => state.routerData.addRouters,
    routers: state => state.routerData.routers
  },
  modules: {
    routerData,
    role
  }
})

export default store
