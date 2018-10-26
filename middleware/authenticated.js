export default function({ redirect, route, ...rest }) {
  // If the user is not authenticated
  console.log(rest, 123)
  const whiteList = ['/login']

  if (!sessionStorage.getItem('__uid__')) {
    if (rest.app.$ipcR) {
      rest.app.$ipcR.send('open-login-window')
    }
    if (!whiteList.includes(route.path)) {
      redirect('/login', { from: route.path })
    }
  }
}
