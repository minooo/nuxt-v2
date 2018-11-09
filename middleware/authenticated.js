export default function({ redirect, route, ...rest }) {
  // If the user is not authenticated
  const whiteList = ['/login']
  if (!rest.store.state.user.base.u_id) {
    if (rest.app.$ipcR) {
      rest.app.$ipcR.send('open-login-window')
    }
    if (!whiteList.includes(route.path)) {
      redirect('/login', { from: route.path })
    }
  }
}
