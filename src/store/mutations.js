const mutations = {
  initMenuList: (state, memus) => {
    state.menuInit = memus
  },
  setDailyTargetParams: (state, params) => {
    state.dailyTargetParams = params
  },
  setChartsModulesList: (state, value) => {
    state.chartsModulesList = value
    sessionStorage.setItem("chartsModulesList", JSON.stringify(value));
  },
  changeSelectedChart: (state, obj) => {
    state.selectedChart = obj
    sessionStorage.setItem("selectedChart", JSON.stringify(obj));
  },
  initActionUrlList: (state, list) => {
    state.actionUrlList = list
  }
}
export default mutations