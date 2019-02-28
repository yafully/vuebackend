/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-27 16:17:36
 */
import Cookies from 'js-cookie'

const Layout = {
	state: {
		sidebar: {
		  opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
		  withoutAnimation: true
		}
	},
	mutations: {
		toggleSideBar: state => {
	      state.sidebar.opened = !state.sidebar.opened
	      state.sidebar.withoutAnimation = false
	      Cookies.set('sidebarStatus', state.sidebar.opened ? 1 : 0)
	    },
	    closeSideBar: (state, withoutAnimation) => {
	      Cookies.set('sidebarStatus', 0)
	      state.sidebar.opened = false
	      state.sidebar.withoutAnimation = withoutAnimation
	    }
	},
	actions: {
		toggleSideBar({ commit }) {
		  commit('toggleSideBar')
		},
		closeSideBar({ commit }, { withoutAnimation }) {
		  commit('closeSideBar', withoutAnimation)
		}
	}
}

export default Layout