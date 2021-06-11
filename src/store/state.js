const state = {
  menuInit: localStorage.getItem('menuInit') ? JSON.parse(localStorage.getItem('menuInit')) : [],
  actionUrlList: localStorage.getItem('actionUrlList') ? JSON.parse(localStorage.getItem('actionUrlList')) : [],
  dailyTargetParams: sessionStorage.getItem('dailyTargetParams') ? JSON.parse(sessionStorage.getItem('dailyTargetParams')) : {},
  chartsModulesList: sessionStorage.getItem("chartsModulesList") ? JSON.parse(sessionStorage.getItem("chartsModulesList")) : [],
  selectedChart: sessionStorage.getItem('selectedChart') ? JSON.parse(sessionStorage.getItem('selectedChart')) : {},
}

export default state