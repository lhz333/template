<template>
  <div class="tags" :class="[isDashboardPage && isHasDashboardPage ? 'dashboard' :'']" v-if="showTags">
    <ul>
      <li
        class="tags-li"
        v-for="(item,index) in tagsList"
        :class="{'active': isActive(item.path)}"
        :key="index"
      >
        <router-link :to="item.fullPath" class="tags-li-title">{{item.title}}</router-link>
        <span class="tags-li-icon" @click="closeTags(index)">
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button type="primary" size="small">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from './bus';
export default {
  data () {
    return {
      tagsList: []
    }
  },
  methods: {
    isActive (path) {
      return path === this.$route.path;
    },
    // 关闭单个标签
    closeTags (index) {
      const delItem = this.tagsList.splice(index, 1)[0];
      if (delItem.path === '/returnAddPage') {
        localStorage.removeItem('currentDate')
      }
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
      if (item) {
        delItem.path === this.$route.path && this.$router.push(item.fullPath)
      } else {
        this.$router.push('/');
      }
    },
    // 关闭全部标签
    closeAll () {
      this.tagsList = [];
      this.$router.push('/');
    },
    // 关闭其他标签
    closeOther () {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.path;
      })
      this.tagsList = curItem;
    },
    // 设置标签
    setTags (route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.path;
      })
      if (!isExist) {
        if (this.tagsList.length >= 8) {
          this.tagsList.shift();
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.path,
          fullPath: route.fullPath,
          name: route.matched[1].components.default.name
        })
      } else {
        let index = this.tagsList.findIndex(item => item.path === route.path)
        this.$set(this.tagsList[index], 'fullPath', route.fullPath)
      }
      bus.$emit('tags', this.tagsList);
    },
    handleTags (command) {
      command === 'other' ? this.closeOther() : this.closeAll();
    }
  },
  computed: {
    isDashboardPage () {
      return this.$route.path === '/dashboard'
    },
    menuInitData () {
      return this.$store.getters.menuInit
    },
    // 获取菜单权限配置里是否有首页
    isHasDashboardPage () {
      if (!this.menuInitData.length) return false
      return this.menuInitData.some(item => {
        return item.index === 'dashboard'
      })
    },
    showTags () {
      return this.tagsList.length > 0;
    }
  },
  watch: {
    $route (newValue, oldValue) {
      this.setTags(newValue);
    }
  },
  created () {
    this.setTags(this.$route);
    // 监听关闭当前页面的标签页
    bus.$on('close_current_tags', () => {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i];
        if (item.path === this.$route.path) {
          if (i < len - 1) {
            this.$router.push(this.tagsList[i + 1].path);
          } else if (i > 0) {
            this.$router.push(this.tagsList[i - 1].path);
          } else {
            this.$router.push('/');
          }
          this.tagsList.splice(i, 1);
          break;
        }
      }
    })
  }
}

</script>


<style>
.tags {
  position: relative;
  height: 40px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
}

.tags.dashboard {
  background: #121b2c;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 5px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  border: 1px solid #e9eaec;
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  color: #fff;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 40px;
  /* background: #fff; */
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
