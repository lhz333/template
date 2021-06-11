var token = {
  saveToken: function (token) {
    localStorage.setItem('access_token', token.access_token)
    localStorage.setItem('token', token.token_type + ' ' + token.access_token)
    localStorage.setItem('username', token.userName)
    localStorage.setItem('expires_in', token.expires_in)
    localStorage.setItem('refresh_token', token.refresh_token)
    localStorage.setItem('token_type', token.token_type)
    localStorage.setItem('scope', token.scope)
    localStorage.setItem('department', token.department);
    localStorage.setItem('roles', JSON.stringify(token.roles));
  },
  loadToken: function () {
    const tokenInfo = {}
    tokenInfo.access_token = localStorage.getItem('token')
    tokenInfo.expires_in = localStorage.getItem('expires_in')
    tokenInfo.refresh_token = localStorage.getItem('refresh_token')
    tokenInfo.token_type = localStorage.getItem('token_type')
    tokenInfo.token = localStorage.getItem('access_token')
    tokenInfo.username = localStorage.getItem('username')
    tokenInfo.scope = localStorage.getItem('scope')
    tokenInfo.department = localStorage.getItem('department')
    tokenInfo.roles = localStorage.getItem('roles')
    return tokenInfo
  }
}

export default token
