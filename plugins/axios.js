import Vue from 'vue'
// import qs from 'qs'

// 参考文档 https://axios.nuxtjs.org/helpers
export default function(ctx) {
  console.log('funnnnnnn')
  // console.log('ctx', ctx)
  // 介里面的参数就是 https://nuxtjs.org/api/context 好吧？

  // 拦截器的集成
  // onRequest(config)
  // onResponse(response)
  // onError(err)
  // onRequestError(err)
  // onResponseError(err)
  ctx.$axios.onRequest(config => {
    const uID = sessionStorage.getItem('__uid__')
    const accessToken = sessionStorage.getItem('__token__')

    if (!uID || !accessToken) return config

    if (config.data instanceof FormData) {
      const _params = { uID, accessToken }
      config.params = { ...config.params, ..._params }
      return config
    }

    // why?
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // if (config.method === 'post') {
    //   let data = qs.parse(config.data)

    //   config.data = qs.stringify({
    //     ..._params,
    //     ...data
    //   })
    // } else if (config.method === 'get') {
    //   config.params = {
    //     ..._params,
    //     ...config.params
    //   }
    // }

    return config
  })

  ctx.$axios.onResponse(function(response) {
    const { data } = response
    if (data && data.code === -100) {
      // error({
      //   statusCode: '301',
      //   message: '访问太快了，休息一下'
      // })

      if (ctx.route.path !== '/login') {
        Vue.prototype.$message.error('您需要登陆哦！')
        ctx.redirect('/login', { from: ctx.route.path })
      }
    }
  })
  ctx.$axios.onError(error => {
    Vue.prototype.$message.error('抱歉，网络连接异常，请稍候重试~')
    console.log('onError', error, error.response, error.response.status)
    // const code = parseInt(error.response && error.response.status)
    // if (code === 400) {
    //   ctx.redirect('/400')
    // }
    // if (code === 500) {
    //   ctx.redirect('/sorry')
    // }
  })
}
