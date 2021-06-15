<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="(item,index) in items">
        <template v-if="item.subs && item.subs.length>0 ">
          <el-submenu :index="`/${item.index}`" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="(subItem,idx) in item.subs">
              <el-submenu
                v-if="subItem.subs && subItem.subs.length"
                :index="`/${subItem.index}`"
                :key="idx"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="`/${threeItem.index}`"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="`/${subItem.index}`"
                :key="subItem.index"
              >{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item class="super_menu_item" :index="`/${item.index}`" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus';
export default {
  data () {
    return {
      collapse: false,
      items: [{
        icon: "el-icon-lx-home",
        index: "dashboard",
        order: 0,
        title: "首页管理"
      }, {
        icon: "el-icon-s-opportunity",
        index: "",
        order: 1,
        title: "示例页面",
        subs: [{
          title: "demo",
          index: "demo",
          order: 0
        }]
      }]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path
    },
    // items: {
    //   get () {
    //     return this.$store.getters.menuInit
    //   },
    //   set () {

    //   }
    // }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
    })
    // this.$store.dispatch('initMenuList')
  },
  methods: {

  },
  watch: {
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
.el-menu-item {
  height: 40px;
  line-height: 40px;
  background-color: #1f2d3d !important;
}

.el-menu-item:hover {
    background-color: #001528 !important;
}

.el-submenu__title {
  height: 50px;
  line-height: 50px;
}

.el-submenu__title:hover {
  background-color: #263445 !important;
}

.hover-menu-item {
  height: 40px;
  line-height: 40px;
}

.super_menu_item {
  height: 50px !important;
  line-height: 50px !important;
  background-color: #304156 !important;
}

</style>
<style>
.el-menu-item {
  height: 40px;
  line-height: 40px;
}

.el-submenu__title {
  height: 50px;
  line-height: 50px;
}

.hover-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>

