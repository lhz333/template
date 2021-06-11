<template>
  <el-carousel arrow="always" :autoplay="false">
    <el-carousel-item v-for="item in imgList" :key="item">
      <el-image fit="contain" :src="`${imgUrl}${item}`"></el-image>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      imgUrl: process.env.VUE_APP_Images,
    }
  },
  components: {},
  props: {
    imgArr: {
      type: String,
      default: null
    }
  },
  computed: {
    imgList () {
      if (!this.imgArr) {
        return;
      }
      let arr = this.imgArr.split(";");
      if(!arr[arr.length-1]){
        arr.pop()
      }
      return arr;
    }
  }
}
</script>

<style lang='less' scoped>
body .el-carousel__item {
  text-align: center;
  .el-image {
    height: 100%;
  }
}
</style>