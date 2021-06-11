export default {
  data () {
    return {
      tableHeight: 400
    }
  },
  created () { },
  mounted () {
    // 固定表头，根据屏幕大小计算表格高度
    this.$nextTick(() => {
      setTimeout(() => {
        let that = this
        let top = this.$refs.table.$el.offsetTop
        let paginationHeight = 0
        if (this.$refs.hasOwnProperty('pagination')) paginationHeight = this.$refs.pagination.$el.offsetHeight
        if (this.$refs.hasOwnProperty('paginationComponent')) paginationHeight = this.$refs.paginationComponent.$refs.pagination.$el.offsetHeight
        this.tableHeight = window.innerHeight - top - paginationHeight - 90
        window.onresize = function () {
          that.tableHeight = window.innerHeight - top - paginationHeight - 90
        }
      }, 1000)
    })
  },
  deactivated () {
    let el = this.$refs.table.$el.querySelector('.el-table__body-wrapper')
    this.tableSrollTop = el.scrollTop
  },
  activated () {
    this.$nextTick(() => {
      let el = this.$refs.table.$el.querySelector('.el-table__body-wrapper')
      el.scrollTop = this.tableSrollTop
    })
  },
  methods: {}
}
