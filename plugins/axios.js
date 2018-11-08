import Vue from 'vue'
import qs from 'qs'

// 参考文档 https://axios.nuxtjs.org/helpers
export default function(ctx) {
  // console.log('ctx', ctx)
  // 介里面的参数就是 https://nuxtjs.org/api/context 好吧？

  // 拦截器的集成
  // onRequest(config)
  // onResponse(response)
  // onError(err)
  // onRequestError(err)
  // onResponseError(err)
  ctx.$axios.onRequest(config => {
    // console.log('minoo', ctx.store.state.user, ctx.app.store.state.user)
    const noAuth = config.data.noAuth
    delete config.data.noAuth
    const initParams = qs.parse(config.data)

    // eslint-disable-next-line
    const { u_id, c_id, u_password } = ctx.store.state.user.base
    const _params = {
      ...initParams,
      api_version: '1.2',
      app_id: 'zc_pc_admin',
      request_date: ctx.app.$utils.moment().format('YYYY-MM-DD HH:mm:ss'),
      request_sign: '9b3ef6d0523e-5c1a41380f7e',
      ...(!noAuth && {
        u_id,
        c_id,
        password: u_password
        // ver: '1.6.0.19-网易云信V1'
      })
      // ver: '1.6.0.17'
    }
    let str = ctx.app.$utils.common.serializeParams(_params)

    str = `service.inswindows.com${
      config.url
    }?${str}Jck3Dy3CjkZUji6MhPnRU1i8LKfPnHAl`

    str = ctx.app.$utils.md5(str)
    _params.sign = str

    // const uID = sessionStorage.getItem('__uid__')
    // const accessToken = sessionStorage.getItem('__token__')

    // if (!uID || !accessToken) return config

    if (config.data instanceof FormData) {
      config.params = { ...config.params, ..._params }
      return config
    }

    // wh
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (config.method === 'post') {
      let data = qs.parse(config.data)

      config.data = qs.stringify({
        ...data,
        ..._params
      })
    } else if (config.method === 'get') {
      config.params = {
        ...config.params,
        ..._params
      }
    }
    return config
  })

  ctx.$axios.onResponse(function(response) {
    const { data } = response
    if (data && data.code === -1) {
      // error({
      //   statusCode: '301',
      //   message: '访问太快了，休息一下'
      // })
      Vue.prototype.$message.error(data.message || '账号或密码错误，请检查')
      if (ctx.route.path !== '/login') {
        Vue.prototype.$message.error(data.message || '您需要登陆哦！')
        ctx.redirect('/login', { from: ctx.route.path })
      }
    }
  })
  ctx.$axios.onError(error => {
    Vue.prototype.$message.error('抱歉，网络连接异常，请稍候重试~')
    console.log('onError', error)
    // const code = parseInt(error.response && error.response.status)
    // if (code === 400) {
    //   ctx.redirect('/400')
    // }
    // if (code === 500) {
    //   ctx.redirect('/sorry')
    // }
  })
}
