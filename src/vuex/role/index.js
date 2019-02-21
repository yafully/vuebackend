/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-18 10:03:08
 */
import store from '../index'
import router from '../../route/index/'
export default {
  state: {
    info: ''  // 每次刷新都要通过token请求个人信息来筛选动态路由
  },
  mutations: {
    getInfo (state, token) {
      // 省略 axios 请求代码 通过 token 向后台请求用户权限等信息，这里用假数据赋值
      // console.log(4444)
      state.info = token ? {
        role: token.roleInfo.role,//superAdmin
        permissions: token.roleInfo.permissions
      } : {}
	  // sessionStorage.setItem('info', JSON.stringify(store.getters.info))

    },
    setRole (state, options) {  // 切换角色，测试权限管理
      state.info = {
        role: options.roleInfo.role,
        permissions: options.roleInfo.permissions
      }
      sessionStorage.setItem('info', JSON.stringify(store.getters.info));
      store.dispatch('newRoutes', options.roleInfo.role)
      router.addRoutes(store.getters.addRouters)
    }
  },
  actions: {
    getInfo ({commit}, token) {
      commit('getInfo', token)
    },
    setRole ({commit}, options){
      // 权限测试
      commit('setRole', options)
    }
  }
}
