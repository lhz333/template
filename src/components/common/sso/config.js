var config = {
  baseOAuthUrl: 'http://sso.yilimaizi.club/',
  // 请求授权地址
  userAuthorizationUri: 'http://sso.yilimaizi.club/oauth/authorize',
  // accessToken请求地址
  accessTokenUri: '/sso/oauth/token',
  // 用户信息请求地址
  userInfoUri: 'http://sso.yilimaizi.club/security/getUserInfo',
  // 登出请求地址
  logoutUri: 'http://sso.yilimaizi.club/logout',

  // baseOAuthUrl: 'http://192.168.26.24:8080/',
  // // 请求授权地址
  // userAuthorizationUri: 'http://192.168.26.24:8080/oauth/authorize',
  // // accessToken请求地址
  // accessTokenUri: '/sso/oauth/token',
  // // 用户信息请求地址
  // userInfoUri: 'http://192.168.26.24:8080/security/getUserInfo',
  // // 登出请求地址
  // logoutUri: 'http://192.168.26.24:8080/logout',
  // 项目地址
  localuri: 'http://localhost:10000',
  redirect_uri: 'http://localhost:10000/login',
  // 案例资源服务器地址
  resUri: 'http://localhost:8080',
  // 店铺回调的地址
  shop_redirect_uri: 'http://localhost:10000/shopManage',
  // 客户端相关标识，请从认证服务器申请
  clientId: 'OMS',
  client_secret: 'user123',
  // 申请的权限范围
  scope: 'all',
  // 可选参数，客户端的当前状态，可以指定任意值，用于校验，此次案例不做相关认证
  state: 'villiam',
  // 一些固定的请求参数
  response_type: 'code',
  grant_type: 'authorization_code',
  code: ''
}

export default config
