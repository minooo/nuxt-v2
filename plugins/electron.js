// 联合注入 https://nuxtjs.org/guide/plugins#combined-inject
const { ipcRenderer } = require('electron')

export default ({ app }, inject) => {
  inject('ipcR', ipcRenderer)
}
