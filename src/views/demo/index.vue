<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input
          @keyup.enter.native="crud.toQuery"
          v-model="query.articleCode"
          size="small"
          clearable
          placeholder="请输入货号"
          class="filter-item"
        />

        <el-select
          @change="crud.toQuery"
          clearable
          class="filter-item"
          v-model="query.type"
          placeholder="请选择类型"
        >
          <el-option v-for="item in demoOptions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <rrOperation />
      </div>
      <crudOperation />
    </div>
    <!--表格渲染-->
    <el-table
      border
      :max-height="tableHeight"
      v-loading="crud.loading"
      :data="crud.data"
      ref="table"
      :header-cell-style="{background:'#f2f4f6'}"
      style="width: 100%;"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column label="货号" align="center" prop="articleCode"></el-table-column>
      <el-table-column label="类型" align="center" prop="type"></el-table-column>
      <el-table-column label="名称" align="center" prop="name"></el-table-column>
      <el-table-column label="备注" align="center" prop="memo"></el-table-column>
      <!--   编辑与删除   -->
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <template slot-scope="scope">
          <udOperation :data="scope.row" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination ref="paginationComponent" />

    <!-- 表单渲染 -->
    <el-dialog
      class="dialog"
      append-to-body
      :before-close="crud.cancelCU"
      :visible.sync="crud.status.cu > 0"
      :title="crud.status.title"
      width="50%"
    >
      <el-form 
        ref="form"
        :inline="true" 
        :model="form" 
        :rules="rules"
        label-width="160px"
      >
        <el-form-item label="货号" prop="articleCode">
          <el-input v-model="form.articleCode"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type">
            <el-option v-for="item in demoOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import seekHeight from '@/mixins/seekHeight.js'
import crudJob from '@/api/demo/index.js'
import CRUD, { presenter, header, form, crud } from '@/components/Curd/curd'
import pagination from '@/components/Curd/Pagination'
import udOperation from '@/components/Curd/UD.operation'
import rrOperation from '@/components/Curd/RR.operation'
import crudOperation from '@/components/Curd/CRUD.operation'
import API from '@/utils/api'
const defaultForm = { articleCode: '', type: '' }
export default {
  name: 'demo',
  components: { pagination, udOperation, crudOperation, rrOperation },
  cruds () {
    return CRUD({
      title: 'demo',
      url: '此处填写列表接口',
      importUrl: '此处填写导入接口',
      templateUrl: '此处填写下载模板接口',
      downloadUrl: '此处填写导出接口',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter(), header(), form(defaultForm), crud(), seekHeight],
  data () {
    return {
      demoOptions: ['未处理', '已处理'],
      rules: {
        articleCode: [{ required: true, trigger: "blur", message: "请输入货号" }],
      }
    }
  },
  created () {
    this.crud.optShow = {
      add: true,
      edit: true,
      del: true,
      download: true,
      import: true,
      template: true,
      reset: true
    }
  },
  methods: {

  }
}
</script>

<style lang="less"  scoped>
</style>