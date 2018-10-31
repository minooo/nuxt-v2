// https://www.lodashjs.com/docs/4.17.5.html
import uniqueId from 'lodash/uniqueId'

// 截取指定长度后加… 用于处理标题过长再好不过
// truncate(str, { length: 10 })
import truncate from 'lodash/truncate'

export default {
  uniqueId,
  truncate
}
