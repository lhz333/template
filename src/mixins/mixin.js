export const myMixin = {
  data () {
    return {
      shopOptions: []
    }
  },
  methods: {
    //获取所有店铺信息
    async getShopALL () {
      let res = await this.$axios.get(this.API.system.shopALL)
      let { Status, Result } = res.data
      if (Status == "true") {
        Result.unshift({
          id: 0,
          title: "请选择店铺"
        })
        this.shopOptions = Result
      }
    },
    //根据id获取店铺名称  主要用于表格数据展示
    getShopName (id) {
      if (!this.shopOptions.length) return
      if (id == 0) {
        return ""
      }
      let res = this.shopOptions.find(item => item.id === id)
      if (res) {
        return res.title
      } else {
        return
      }
    }
  },
  mounted () {
    this.getShopALL()
  }
}