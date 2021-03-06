import { axios } from '../utils/http'
import API from '../utils/api'

const actions = {
  initMenuList: ({ commit }) => {
    axios
      .get(API.menu.menuinit, {
        params: {
          username: localStorage.getItem("username"),
          clientId: "OMS"
        }
      })
      .then(res => {
        let { Status, Result } = res.data
        if (Status == 'true') {
          localStorage.setItem('menuInit', JSON.stringify(Result))
          commit('initMenuList', Result)
        }
      })
  }
}
export default actions
