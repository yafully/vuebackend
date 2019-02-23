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
      if (state.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
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
    }
  }
}  

export default tagsView
