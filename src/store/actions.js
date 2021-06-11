import { axios } from '../utils/http'
import API from '../utils/api'
import common from '../utils/common'
const actions = {
  initMenuList: ({ commit }) => {
    axios
      .get(API.menu.menuinit, {
        params: {
          username: localStorage.getItem("username"),
          clientId: "OMS",
          brand: localStorage.getItem("brand")
        }
      })
      .then(res => {
        let { Status, Result } = res.data
        if (Status == 'true') {
          let actionUrlList = common.collectActionUrl(Result)
          localStorage.setItem('menuInit', JSON.stringify(Result))
          localStorage.setItem('actionUrlList', JSON.stringify(actionUrlList))
          commit('initMenuList', Result)
          commit('initActionUrlList', actionUrlList)
        }
      })
  },
  setDailyTargetParams: ({ commit }, params) => {
    sessionStorage.setItem('dailyTargetParams', JSON.stringify(params))
    commit('setDailyTargetParams', params)
  },
  // 配置页面组件数据
  setChartsModulesList: ({ commit }, value) => {
    commit("setChartsModulesList", value);
  },
  changeSelectedChart: ({ commit }, value) => {
    commit("changeSelectedChart", value)
  }
}
export default actions
