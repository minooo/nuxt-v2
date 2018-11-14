export default function({ redirect, route, ...rest }) {
  // If the user is not authenticated
  const whiteList = ['/login']

  if (route.path === '/login') {
    // 如果是返回登录页，应该登出SDK
    console.log('登出nim')
    // window.nim && window.nim.disconnect()
    rest.app.$ipcR && rest.app.$ipcR.send('open-login-window')
    // window.location.reload()
    return
  }
  if (!rest.store.state.user.base.u_id) {
    if (rest.app.$ipcR) {
      rest.app.$ipcR.send('open-login-window')
    }
    if (!whiteList.includes(route.path)) {
      redirect('/login', { from: route.path })
    }
  }
}
