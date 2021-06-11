import { axios } from '@/utils/http'
import API from '@/utils/api'

const add = function (data) {
  return axios({
    url: '',
    method: 'post',
    data
  })
}


export default { add }