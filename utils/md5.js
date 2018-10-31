import crypto from 'crypto-browserify'
export default text =>
  crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex')
