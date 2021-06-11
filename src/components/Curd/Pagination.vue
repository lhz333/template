<!--分页-->
<template>
  <el-pagination
    ref="pagination"
    @size-change="crud.sizeChangeHandler($event)"
    @current-change="crud.pageChangeHandler"
    :page-sizes="[10, 20, 50, 100]"
    :page-size.sync="page.size"
    :total="page.total"
    :current-page.sync="page.page"
    style="margin-top: 8px"
    background
    layout="total, sizes, prev, pager, next"
  ></el-pagination>
</template>
<script>
import { pagination } from '@/components/Curd/curd.js'

export default {
  mixins: [pagination()],
  mounted () {

  }
}
</script>