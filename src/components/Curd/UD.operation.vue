<template>
  <div>
    <el-button
      :loading="crud.status.cu === 2"
      :disabled="disabledEdit"
      v-if="crud.optShow.edit"
      size="mini"
      type="primary"
      icon="el-icon-edit"
      @click="crud.toEdit(data)"
    />
    <el-button
      :disabled="disabledDle"
      v-if="crud.optShow.del"
      size="mini"
      type="danger"
      icon="el-icon-delete"
      @click="toDelete(data)"
    />
  </div>
</template>
<script>


import CRUD, { crud } from '@/components/Curd/curd.js'
export default {
  mixins: [crud()],
  props: {
    data: {
      type: Object,
      required: true
    },
    disabledEdit: {
      type: Boolean,
      default: false
    },
    disabledDle: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: '确定删除本条数据吗？'
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    toDelete (data) {
      this.$confirm(this.msg, "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        this.crud.doDelete(data)
      })
    }
  }
}
</script>