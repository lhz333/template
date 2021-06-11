<template>
  <span>
    <el-tooltip :content="startTimeTitle">
      <el-date-picker
        class="base-search"
        v-model="startTime"
        :type="type"
        clearable
        :value-format="valueFormat"
        :format="valueFormat"
        default-time="00:00:00"
        :placeholder="startTimeTitle"
        :picker-options="pickerOptionsStart"
        @change="changeStartTime"
      ></el-date-picker>
    </el-tooltip>&nbsp;至
    <el-tooltip :content="endTimeTitle">
      <el-date-picker
        class="base-search"
        v-model="endTime"
        :type="type"
        clearable
        :value-format="valueFormat"
        :format="valueFormat"
        default-time="23:59:59"
        :placeholder="endTimeTitle"
        :picker-options="pickerOptionsEnd"
        @change="changeEndTime"
      ></el-date-picker>
    </el-tooltip>
  </span>
</template>
<script>
export default {
  //组件名 日期选择器，主要用于页面时间范围搜索条件
  name: '',
  //实例的数据对象
  data () {
    return {
      startTime: '',
      endTime: '',
      //校验开始时间的选择范围：开始时间不能大于结束时间，不能大于当前时间
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.limitDataType == 'noLimit') {
            return time.getTime() > new Date(this.endTime ? this.endTime : '').getTime()
          }
          if (this.endTime) {
            return time.getTime() > Date.now() || time.getTime() > new Date(this.endTime).getTime()
          } else {
            return time.getTime() > Date.now()
          }
        }
      },
      //校验结束时间的选择范围：结束时间不能小于开始时间，不能大于当前时间
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.limitDataType == 'noLimit') {
            return time.getTime() < new Date(this.startTime ? this.startTime : '').getTime() - 8.64e7
          }
          if (this.type != 'date') {
            return time.getTime() > Date.now()
          }
        }
      }
    }
  },
  //数组或对象，用于接收来自父组件的数据
  props: {
    type: {
      type: String,
      default: 'datetime'
    },
    retainStartTime: {
      type: String
    },
    retainEndTime: {
      type: String
    },
    startTimeTitle: {
      type: String,
      default: '开始日期'
    },
    endTimeTitle: {
      type: String,
      default: '结束日期'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    limitDataType: {
      type: String,
      default: null
    }
  },
  //方法
  methods: {
    //获取开始时间
    changeStartTime (value) {
      this.$emit("startTime", value);
    },
    //获取结束时间
    changeEndTime (value) {
      this.$emit("endTime", value);
    },
    //清空数据
    clear () {
      this.startTime = this.endTime = null;
    }
  },
  //监听
  watch: {
    'retainStartTime': {
      immediate: true,
      handler (newVal) {
        if (newVal) {
          this.startTime = newVal
        }
      }
    },
    'retainEndTime': {
      immediate: true,
      handler (newVal) {
        if (newVal) {
          this.endTime = newVal
        }
      }
    }
  },
}
</script>

<style lang='less' scoped>
</style>