
<template>
  <div class="home">
    <h2 class="title">欢迎使用 CKC 平台</h2>
    <div class="banner"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.home {
  height: 90%;
  .title {
    text-align: center;
    padding: 12px 0 12px 0;
  }
  .banner {
    height: 100%;
    background: url("../assets/images/login_model.png") no-repeat;
    background-size: cover;
  }
}
</style>
