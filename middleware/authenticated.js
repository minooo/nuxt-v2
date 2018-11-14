export default function({ redirect, route, ...rest }) {
  // If the user is not authenticated
  const whiteList = ['/login']

  if (route.path === '/login' && rest.app.$ipcR) {
    // 如果是返回登录页，应该登出SDK
    window.nim && window.nim.disconnect()
    rest.app.$ipcR.send('open-login-window')
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
