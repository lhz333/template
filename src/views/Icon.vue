<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-flower icon"></i> 自定义图标
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <h2>使用方法</h2>
      <p style="line-height: 50px;">直接通过设置类名为 el-icon-lx-iconName 来使用即可。例如：（共{{iconList.length}}个图标）</p>
      <p class="example-p">
        <i class="el-icon-lx-flower icon"></i>
        <span>&lt;i class=&quot;el-icon-lx-flower&quot;&gt;&lt;/i&gt;</span>
      </p>
      <br />
      <h2>图标</h2>
      <div class="search-box">
        <el-input class="search" size="large" v-model="keyword" clearable placeholder="请输入图标名称"></el-input>
      </div>
      <ul>
        <li class="icon-li" v-for="(item,index) in list" :key="index">
          <div class="icon-li-content">
            <i :class="`el-icon-lx-${item}`"></i>
            <span>{{item}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: '',
      iconList: [
        'smile',
        'more',
        'eye',
        'flower',
        'nav',
        'email',
        'lamp',
        'light',
        'camera',
        'support',
        'store',
        'customer',
        'hot',
        'coupon',
        'hear',
        'clock',
        'gift',
        'news',
        'idea',
        'order',
        'search',
        'refresh',
        'home',
        'adress',
        'time',
        'setting',
        'like',
        'cart',
        'warn',
        'account',
        'goods',
        'goods-cart',
        'management',
        'wares',
        'scarce-goods',
        'task',
        'vip',
        'money',
        'OA',
        'matter',
        'guide'
      ]
    }
  },
  computed: {
    list () {
      return this.iconList.filter((item) => {
        return item.indexOf(this.keyword) !== -1;
      })
    }
  }
}
</script>

<style scoped>
.icon {
  font-size: 30px;
  color: red;
}
.example-p {
  height: 45px;
  display: flex;
  align-items: center;
}
.search-box {
  text-align: center;
  margin-top: 10px;
}
.search {
  width: 300px;
}
ul,
li {
  list-style: none;
}
.icon-li {
  display: inline-block;
  padding: 10px;
  width: 120px;
  height: 120px;
}
.icon-li-content {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.icon-li-content i {
  font-size: 36px;
  color: #606266;
}
.icon-li-content span {
  margin-top: 10px;
  color: #787878;
}
</style>