<template>
  <div></div>
</template>

<script>
export default {
  name: 'ssoIndex',
  data () {
    return {
      islogin: false
    }
  },
  methods: {
    checkLogin () {
      this.islogin = this.$login.checkLogin(this)
      if (this.islogin) {
        this.$router.push({ path: this.redirect || '/dashboard' })
      } else {
        this.login()
      }
    },
    login () {
      this.$login.login(this)
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>

<style>
</style>

