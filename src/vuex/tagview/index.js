/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-23 14:18:06
 */
 const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
  	addVisitedView (state, view) {
		if (state.visitedViews.some(v => v.path === view.path)) return
		state.visitedViews.push(
			Object.assign({}, view, {
			  title: view.meta.title || 'no-name'
			})
		)
  	},
  	addCachedView (state, view) {
      if (state.cachedViews.includes(view.meta.modName)) return
      if (!view.meta.noCache) {
        state.cachedViews.push(view.meta.modName)
      }
    },
    delVisitedView: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    },
    delCachedView: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.meta.modName) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    delAllVisitedViews: (state) => {
      // keep affix tags
      const remainTags = state.visitedViews.filter(tag => tag.meta.noClose)
      state.visitedViews = remainTags
    },
    delAllCachedViews: (state) => {
      state.cachedViews = []
    }
  },
  actions: {
  	addView({ dispatch }, view) {
      dispatch('addVisitedView', view)
      dispatch('addCachedView', view)
    },
  	addVisitedView ({ commit }, view) {
      commit('addVisitedView', view)
    },
    addCachedView({ commit }, view) {
      commit('addCachedView', view)
    },
    delVisitedView({ commit, state }, view) {
      return new Promise(resolve => {
        commit('delVisitedView', view)
        resolve([...state.visitedViews])
      })
    },
    delCachedView({ commit, state }, view) {
      return new Promise(resolve => {
        commit('delCachedView', view)
        resolve([...state.cachedViews])
      })
    },
    delView({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delVisitedView', view)
        dispatch('delCachedView', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delAllViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delAllVisitedViews', view)
        dispatch('delAllCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delAllVisitedViews({ commit, state }) {
      return new Promise(resolve => {
        commit('delAllVisitedViews')
        resolve([...state.visitedViews])
      })
    },
    delAllCachedViews({ commit, state }) {
      return new Promise(resolve => {
        commit('delAllCachedViews')
        resolve([...state.cachedViews])
      })
    }
  }
}  

export default tagsView
