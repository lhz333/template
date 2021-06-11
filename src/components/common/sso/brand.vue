<template>
  <div class="brand">
    <el-card class="box-card">
      <div slot="header">
        <span>选择品牌</span>
      </div>
      <ul class="list">
        <li
          class="item"
          v-for="(item, index) in brandList"
          :key="index"
          @click="selectBrand(item)"
        >{{item}}</li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      brandList: JSON.parse(localStorage.getItem('brandList'))
    }
  },
  methods: {
    selectBrand (item) {
      localStorage.setItem('brand', item);
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style lang="less" scoped>
.brand {
  padding-top: 60px;
  .box-card {
    width: 50%;
    margin: 0 auto;
    .list {
      display: flex;
      .item {
        flex: 1;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        padding: 30px 0;
        text-align: center;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border: 1px solid #ebeef5;
        margin: 0 4px;
      }
    }
  }
}
</style>