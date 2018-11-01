export const isMobile = mobile => {
  if (!mobile) {
    return false
  }
  const m = mobile.replace(/ /g, '')
  return /^1[3|4|5|7|8]\d{9}$/.test(m) ? m : false
}

export const isName = name => {
  if (!name) {
    return false
  }
  const m = name.replace(/ /g, '')
  return /^[\u4e00-\u9fa5]{2,4}$/.test(m) ? m : false
}

export const isPwd = pwd => {
  if (!pwd) {
    return false
  }
  const m = pwd.replace(/ /g, '')
  return /^[a-z0-9]{8,16}$/.test(m) ? m : false
}

export const isIOS = () => /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)

export const isAndroid = () => /(Android)/i.test(navigator.userAgent)

// 大额数字转万 / 亿
export const clipBigNum = item => {
  const num = +item
  if (num >= 100000000) {
    const n1 = num / 100000000
    const n2 = parseInt(n1, 0)
    const s2 = (parseInt(num / 10000000, 0) / 10).toFixed(1)
    if (n1 === n2 || +s2 === n2) {
      return `${n2}亿`
    }
    return `${s2}亿`
  }
  if (num >= 10000) {
    const n1 = num / 10000
    const n2 = parseInt(n1, 0)
    const s2 = (parseInt(num / 1000, 0) / 10).toFixed(1)
    if (n1 === n2 || +s2 === n2) {
      return `${n2}万`
    }
    return `${s2}万`
  }
  return item
}

export const serializeParams = params =>
  Object.entries(params)
    .sort()
    .filter(x => x[0] !== 'file')
    .map(x => `${x[0]}=${x[1]}`)
    .join('&')

// search 转为 obj
export const searchToObj = (
  path = decodeURIComponent(window.location.hash)
) => {
  // window.location.search
  const obj = {}
  if (!path) return obj
  const search = path.slice(path.indexOf('?'))
  if (!search || search.length < 4) return obj
  const arr = search.slice(1).split('&')
  arr.forEach(item => {
    const itemArr = item.split('=')
    const key = itemArr[0]
    const val = itemArr[1]
    obj[key] = val
  })
  return obj
}
