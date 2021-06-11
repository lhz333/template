<template>
  <el-upload
    :class="{'base-text':!isBtn}"
    class="upload"
    :action="action"
    :show-file-list="isShowFileList"
    :headers="headersParams"
    :name="name"
    ref="upload"
    list-type="picture"
    :type="fileType"
    :data="uploadParams"
    :multiple="multiple"
    :file-list="fileList"
    :before-upload="beforeUpload"
    :on-success="upload"
    :on-error="uploadError"
    :on-preview="handlePreview"
    :before-remove="handleRemove"
  >
    <el-button class="base-btn" v-if="isBtn" icon="el-icon-upload">{{btnTextName}}</el-button>
    <span v-else>{{btnTextName}}</span>
  </el-upload>
</template>
<script>
import { Loading } from 'element-ui'

export default {
  //组件名
  name: '',
  //实例的数据对象
  data () {
    return {
      loadinginstace: null,
      headersParams: {
        loginName: localStorage.getItem('username') || '',
        Authorization: localStorage.getItem('token') || ''
      }
      // fileList: []
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //数组或对象，用于接收来自父组件的数据
  props: {
    //必选参数，上传的地址
    action: {
      type: String,
      default: '',
      required: true
    },
    //上传的文件字段名
    name: {
      type: String,
      default: 'file'
    },
    //上传时附带的额外参数
    uploadParams: {
      type: Object
    },
    checkParams: {
      type: Object
    },
    isCheck: {
      type: Boolean,
      default: false
    },
    //是否显示文件列表
    isShowFileList: {
      type: Boolean,
      default: false
    },
    //上传的文件类型 图片Image或者表格Excel
    fileType: {
      type: String,
      default: 'Excel'
    },
    //按钮名称
    btnTextName: {
      type: String,
      default: "导入"
    },
    //是否支持多选
    multiple: {
      type: Boolean,
      default: false
    },
    //是否是按钮
    isBtn: {
      type: Boolean,
      default: true
    },
    //图片列表
    fileList: {
      type: Array
    },
    //导入成功之后 下载文件
    resIsExcel: {
      type: Boolean,
      default: false
    },
    importAndDownload: {
      type: Boolean,
      default: false
    }
  },
  //计算
  computed: {},
  //方法
  methods: {
    beforeUpload (file) { //上传文件前的校验
      let valid, message;
      this.loadinginstace = Loading.service({
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0)'
      })
      //导入必填字段校验
      if (this.isCheck) {
        for (var key in this.checkParams) {
          if (!this.uploadParams[key] || this.uploadParams[key] === undefined) {
            this.$message.error(`请选择${this.checkParams[key]}`)
            this.loadinginstace.close()
            return false
          }
        }
      }
      if (this.fileType == 'Excel') {
        valid = this.common.uploadValidExcel(file);
        message = "您上传的文件类型不正确，请重新上传格式为'xlsx','xls'的文件";
      } else if (this.fileType == 'Image') {
        valid = this.common.uploadValidImage(file);
        message = "您上传的图片类型不正确，请重新上传格式为'jpg', 'jpeg', 'png', 'gif'的文件";
      } else if (this.fileType == 'txt') {
        valid = true
      }
      //导入之后下载excel
      if (this.resIsExcel) {
        this.$emit('downloadFile', file)
        return false
      }
      if (this.importAndDownload) {
        this.templateUploadDownload(file)
        return false
      }
      if (!valid) {
        this.$message.error(message)
        this.loadinginstace.close()
        this.$refs.upload.clearFiles()
        return false
      }
    },
    templateUploadDownload (file) {
      let formData = new FormData();
      formData.append("file", file);
      this.$axios.post(this.action, formData, {
        responseType: "arraybuffer"
      }).then((res) => {
        let enc = new TextDecoder('utf-8')
        res = JSON.parse(enc.decode(new Uint8Array(res.data)))
        if (res.Status == "true") {
          this.$emit('uploadSuccess', res);
          this.$message.success(res.Msg)
        } else {
          this.$message.error(res.Result)
        }
      }).catch(err => {
        this.$message.error('上传失败');
        const content = err.response.data;
        const blob = new Blob([content]);
        let url = window.URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute(
          "download",
          err.response.headers["content-disposition"].split("=")[1]
        );
        document.body.appendChild(link);
        link.click();
        this.$emit('uploadSuccess', err);
      })
    },
    upload (res, file, fileList) { //文件上传成功时的钩子
      let { Status } = res
      this.loadinginstace.close();
      if (Status == "true") {
        if (this.isShowFileList) {
          this.fileList.push({
            name: res.Msg,
            url: `${process.env.VUE_APP_Images}/images/${res.Msg}`
          });
          this.$emit('uploadFileList', this.fileList);
        }
        this.$message.success(res.Msg)
        this.$emit('uploadSuccess', res);
      } else {
        if (this.isShowFileList) {
          fileList.splice(fileList.findIndex(item => item.name === file.name), 1)
        }
        let message = res.Result ? res.Result : res.Msg
        this.$message.error({
          message: message,
          showClose: true
        })
      }
    },
    uploadError (err) { //文件上传失败时的钩子
      this.loadinginstace.close();
      if (err.status == '405') {
        this.$message.error({
          message: '您没有此功能的操作权限！'
        })
        return
      }
      if (err.status == "401") {
        this.$message.error({
          message: '登录已过期，请您重新登录！'
        })
        localStorage.clear()
        this.$router.push({
          path: '/login'
        })
      }
      this.$message.error('上传失败');

    },
    handleRemove (file, fileList) { //删除文件之前的钩子
      if (this.isShowFileList) {
        this.fileList.splice(this.fileList.findIndex(item => item.name === file.name), 1)
      }
      this.$emit('uploadFileList', this.fileList);
    },
    handlePreview (file) { //点击文件列表中已上传的文件时的钩子
      // console.log(file);
    }
  },
  //生命周期函数
  created () {

  },
  beforeMount () {

  },
  mounted () {

  },
  //监听
  watch: {

  },
}
</script>

<style lang='less'>
.base-text {
  .el-upload {
    width: 100%;
    text-align: left;
  }
}
// body {
//   .el-upload-list--picture
//     .el-upload-list__item.is-success
//     .el-upload-list__item-name {
//     line-height: 26px;
//     white-space: normal;
//   }
// }
</style>