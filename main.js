/*
**  Nuxt
**  文档，https://www.cnblogs.com/BigJ/p/electron.html
*/

const http = require('http')
const { Nuxt, Builder } = require('nuxt')
let config = require('./nuxt.config.js')
config.rootDir = __dirname // for electron-builder
// 初始化 Nuxt.js
const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)
const server = http.createServer(nuxt.render)

// Build only in dev mode
if (config.dev) {
  builder.build().catch(err => {
    console.error('config.dev.builder', err)
    process.exit(1)
  })
}

// Listen the server
server.listen()
const _NUXT_URL_ = `http://localhost:${server.address().port}`
console.log(`Nuxt working on ${_NUXT_URL_}`)

/*
** Electron
*/
let win = null
let tray = null
const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')

// 创建实例
const newWin = () => {
  const initW = 912
  const initH = 695
  const loginW = 688
  const loginH = 434
  win = new BrowserWindow({
    width: initW,
    height: initH,
    minWidth: initW,
    minHeight: initH,
    frame: false, // 无边框
    icon: `${__dirname}/static/icons/icon.ico`,
    // show: false, // 创建窗口时是否显示
    backgroundColor: '#20a0ff'
  })

  // win.maximize() // 窗口最大化
  // win.on('closed', () => (win = null))

  /*
  **  主进程发送&处理消息
  **  文档，https://electronjs.org/docs/api/ipc-main#ipcmain
  */

  // 需要登陆时，窗口变化
  ipcMain.on('open-login-window', () => {
    win.setMinimumSize(loginW, loginH)
    win.setSize(loginW, loginH)
    win.setResizable(false)
  })

  // 登陆成功后，窗口恢复
  ipcMain.on('restore-window', () => {
    win.setResizable(true)
    win.setMinimumSize(initW, initH)
    win.setSize(initW, initH)
    win.focus()
  })

  // 最大化窗口
  ipcMain.on('maximize-window', () => {
    win.maximize()
  })

  // 取消窗口最大化，恢复初始大小
  ipcMain.on('unmaximize-window', () => {
    win.unmaximize()
  })

  // 最小化窗口
  ipcMain.on('minimize-window', () => {
    win.minimize()
  })

  // 关闭窗口，注意不是退出
  ipcMain.on('hide-window', () => {
    win.hide()
  })

  // 退出程序
  ipcMain.on('quit-app', () => {
    app.quit()
  })

  if (config.dev) {
    // Install vue dev tool and open chrome dev tools
    win.webContents.openDevTools()

    // Wait for nuxt to build
    const pollServer = () => {
      http
        .get(_NUXT_URL_, res => {
          if (res.statusCode === 200) {
            win.loadURL(_NUXT_URL_)
          } else {
            setTimeout(pollServer, 300)
          }
        })
        .on('error', pollServer)
    }
    pollServer()
  } else {
    return win.loadURL(_NUXT_URL_)
  }
}

// 实现单例,防止程序多开
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (win) {
      if (win.isMinimized()) {
        win.restore() // 将窗口从最小化状态恢复到以前的状态
      }
      win.focus()
    }
  })

  // 控制你的应用程序的事件生命周期
  app.on('ready', function() {
    newWin()
    tray = new Tray(`${__dirname}/static/icons/icon.ico`)
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '打开保世界',
        click() {
          win.show()
        }
      },
      {
        label: '退出',
        click() {
          app.quit()
        }
      }
    ])
    tray.setToolTip('保世界')
    tray.on('click', () => {
      win.show()
    })
    tray.on('right-click', () => {
      tray.popUpContextMenu(contextMenu)
    })
    // 和上面作用一样，tray.setContextMenu(contextMenu)
  })

  // 只对windows有效,当所有窗口关闭后退出(OS X会强制一个窗口显示)
  app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  // macOS 当应用被激活时发出
  app.on('activate', () => win === null && newWin())
}
