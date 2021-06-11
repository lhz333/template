<template>
  <div></div>
</template>

<script>
export default {
  name: 'ssoLogin',
  data () {
    return {
      state: '',
      code: '',
      loginForm: {
        state: '',
        code: '',
        grant_type: this.$config.grant_type,
        redirect_uri: this.$config.redirect_uri,
        client_id: this.$config.clientId,
        client_secret: this.$config.client_secret,
        client: 'browser'
      }
    }
  },
  methods: {
    getToken: function () {
      this.$axios.post(this.API.menu.getToken, null, {
        params: {
          ...this.loginForm
        }
      }).then(res => {
        let { Result } = res.data
        this.$token.saveToken(Result)
        this.$router.push({ path: this.redirect || '/dashboard' })
      })
    },
  },
  mounted: function () {
    this.code = this.$route.query.code
    if (!this.code) {
      this.$router.push({ path: this.redirect || '/' })
    }
    this.state = this.$config.state
    this.loginForm.code = this.code
    this.loginForm.state = this.state
    this.getToken()
  }
}
</script>

<style>
</style>

