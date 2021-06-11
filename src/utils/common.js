import { Message } from 'element-ui'

export default {
  // 数组根据key排序
  sortByKey: function(array, key) {
    return array.sort(function (a, b) {
      let x = a[key]
      let y = b[key]
      return ((x < y) ? -1 : (x > y) ? 1 : 0)
    })
  },
  /**
   * 上传图片校验
   */
  uploadValidImage: function (file) {
    let fileTypes = ['jpg', 'jpeg', 'png', 'gif']
    let fileName = file.name.toLowerCase()
    let fileType = fileName.slice(
      fileName.lastIndexOf('.') + 1,
      fileName.length
    )
    if (fileTypes.indexOf(fileType) == -1) {
      return false
    } else {
      return true
    }
  },
  /**
   * 上传文件校验
   */
  uploadValidExcel: function (file) {
    let fileTypes = ['xlsx', 'xls', 'csv', 'zip']
    let fileName = file.name.toLowerCase()
    let fileType = fileName.slice(
      fileName.lastIndexOf('.') + 1,
      fileName.length
    )
    if (fileTypes.indexOf(fileType) == -1) {
      return false
    } else {
      return true
    }
  },
  /**
   * 千位分隔符
   */
  toThousands: function (value) {
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
  },
  messageError: function (msg) {
    Message({
      showClose: true,
      message: msg,
      duration: 100000,
      type: 'error'
    })
  },
  // 刷新时清除表格排序样式
  clearTableSortStyle (table) {
    table.columns.forEach(item => {
      if (item.order) item.order = ''
    })
    table.clearSort()
  },
  /**
   * 参数处理
   */
  dealParameter (params) {
    for (var key in params) {
      if (params[key] === '' || params[key] === undefined) {
        delete params[key]
      }
    }
    return params
  },
  /**
   * 深拷贝
   */
  deepClone (target) {
    if (target === null) return null
    if (typeof target !== 'object') return target
    const cloneTarget = Array.isArray(target) ? [] : {}
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = this.deepClone(target[key])  // 递归
      }
    }
    return cloneTarget
  },
  /**
   * 随机数
   */
  RndNum (n) {
    let rnd = ''
    for (let i = 0; i < n; i++) {
      rnd += Math.floor(Math.random() * 10)
    }
    return rnd
  },
  // 获取权限中 所有的actionUrl
  collectActionUrl (arr, actionUrlList = []) {
    arr.forEach(({ actionUrl, subs, urls }) => {
      if (actionUrl && !actionUrlList.includes(actionUrl)) actionUrlList.push(actionUrl.trim())
      if (subs) this.collectActionUrl(subs, actionUrlList)
      if (urls) this.collectActionUrl(urls, actionUrlList)
    })
    return actionUrlList
  }
}
