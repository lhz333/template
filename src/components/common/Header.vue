<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">
      <img src="../../assets/images/header_logo.png" />
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="changeBrand" v-if="changeBrand">切换品牌</el-dropdown-item>
            <el-dropdown-item command="resetPwd">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <el-dialog
      :visible.sync="dialogFormVisible"
      @close="resetForm"
      width="40%"
      append-to-body
      :modal-append-to-body="true"
      title="修改密码"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" disabled placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="原密码" prop="currentPassword" :label-width="formLabelWidth">
          <el-input v-model="form.currentPassword" type="password" placeholder="请输入原密码"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="newPassword" :label-width="formLabelWidth">
          <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="resetForm()">取消</el-button>
        <el-button size="medium" type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import bus from '../common/bus';
export default {
  data () {
    return {
      collapse: false,
      fullscreen: false,
      changeBrand: false,
      name: 'CK',
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
        ],
        currentPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur', },
        ],
        newPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
        ]
      },
    }
  },
  computed: {
    username () {
      let username = localStorage.getItem('username')
      return username ? username : this.name
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    async handleCommand (command) {
      if (command == 'loginout') {
        var logouturi = this.$config.logoutUri + '?userName=' + localStorage.getItem("username") + '&clientId=' + this.$config.clientId + '&logout_redirect_uri=' + this.$config.localuri + '/'
        // this.$message.success("成功退出登录");
        localStorage.clear()
        window.location.href = logouturi
      } else if (command == 'resetPwd') {
        this.dialogFormVisible = true
        this.form.username = this.username
      } else if (command == "changeBrand") {
        this.$router.push('/brand')
      }
    },
    // 侧边栏折叠
    collapseChage () {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    },
    // 全屏事件
    handleFullScreen () {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    resetForm () {
      this.$refs['form'].resetFields()
      this.dialogFormVisible = false
    },
    submitForm (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          if (this.form.currentPassword == this.form.newPassword) {
            this.$message.error("新密码不能和原密码重复")
            return
          }
          let res = await this.$axios.post(this.API.menu.updatePassword, { ...this.form })
          let { Status, Msg } = res.data
          if (Status == 'true') {
            this.$message.success("密码修改成功")
            this.dialogFormVisible = false
          } else {
            this.$message.error(Msg)
          }
        }
      })
    },

  },
  mounted () {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
    let brandList = JSON.parse(localStorage.getItem('brandList'))
    this.changeBrand = brandList.length > 1 ? true : false
  }
}
</script>
<style lang="less" scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 50px;
}
.header .logo {
  float: left;
  max-height: 50px;
  img {
    height: 38px;
    margin-top: 6px;
  }
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 50px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.language {
  width: 80px;
  cursor: pointer;
  .icon-lang {
    color: #fff;
    padding-left: 10px;
    font-size: 13px;
    &::before {
      padding-right: 4px;
    }
  }
}
</style>
