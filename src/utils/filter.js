import Vue from 'vue'
import moment from 'moment/moment'
// 保留两位小数
Vue.filter('fixTwoNumber', (value = 0) => {
  let val = Math.round(value * 100) / 100
  return val.toFixed(2)
})
// 日期格式化
Vue.filter('dateFormat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  // 判断数据如果为空返回'--' 否则返回日期
  if (!dataStr) {
    return ' -- '
  }
  return moment(dataStr).format(pattern)
})

// 日期格式化  只保留年月日
Vue.filter('dateFormatToYMD', function(dataStr, pattern = 'YYYY-MM-DD') {
  // 判断数据如果为空返回'--' 否则返回日期
  if (!dataStr) {
    return ' -- '
  }
  return moment(dataStr).format(pattern)
})
// 格式化数字三位加一逗号
Vue.filter('toThousands', function(value) {
  let result = ''
  let num = (value || 0).toString()
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return result
})
