/**
 * 
 * @authors YafullyZhao (yafully@gmail.com)
 * @date    2019-02-22 13:38:33
 */
import 'babel-polyfill'
import { getLang, setLang } from '@common/lang'

const language = {
  state: {
    language: getLang() || 'zh'
  },
  mutations: {
    setLang (state, language) {
      state.language = language
      setLang(language)
    }
  },
  actions: {
    setLanguage({commit}, language) {
      commit('setLang', language)
    }
  }
}
export default language