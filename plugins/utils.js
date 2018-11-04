// 添加公用的属性
import utils from '~/utils'
export default ({ app }, inject) => {
  inject('utils', utils)
}
