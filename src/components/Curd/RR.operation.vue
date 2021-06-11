<!--搜索与重置-->
<template>
  <span>
    <el-button
      style="margin-left:6px;"
      class="filter-item"
      size="mini"
      type="success"
      icon="el-icon-search"
      @click="crud.toQuery"
    >查询</el-button>
    <el-button
      v-if="crud.optShow.reset"
      class="filter-item"
      size="mini"
      type="warning"
      icon="el-icon-refresh-left"
      @click="crud.resetQuery()"
    >重置</el-button>
  </span>
</template>
<script>
import CRUD, { crud } from '@/components/Curd/curd.js'
export default {
  mixins: [crud()],
  props: {
    itemClass: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>


<style lang="less" scoped>
/deep/ .el-button {
  padding: 6px 8px;
}
</style>