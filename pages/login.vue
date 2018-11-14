<template>
  <div style="width: 688px; height: 374px;"
       class="flex ai-center jc-around">
    <div style="width: 300px">
      <div :class="`flex jc-between ai-center ${form.msg ? '' : 'mb30'}`">
        <div class="font18">{{text[0]}}</div>
        <span class="flex-inline ai-center pointer"
              @click="form.type = text[3]">
          <span>{{text[1]}}&nbsp;&nbsp;</span>
          <i class="el-icon-arrow-right c-main font16" />
        </span>
      </div>
      <el-alert v-if="form.msg"
                :title="form.msg"
                type="error"
                class="bg-white font12"
                style="padding-left: 0;"
                :closable="false"
                show-icon>
      </el-alert>

      <div v-if="form.type !== 5"
           class="mb10 border-default h42 flex">
        <div class="s-ico s-ico1 h40 w40"></div>
        <input type="number"
               v-model.trim="form.user"
               @keyup.enter="onSubmit"
               placeholder="手机号"
               class="s-input h40 equal border-none font13" />
      </div>

      <div v-if="form.type !== 1 && form.type !== 5"
           class="flex">
        <div class="mb10 border-default h42 mr10 equal flex">
          <div class="s-ico s-ico2 h40 w40"></div>
          <input type="text"
                 v-model.trim="form.auth"
                 @keyup.enter="onSubmit"
                 placeholder="验证码"
                 maxlength="11"
                 class="s-input h40 equal border-none font13" />
        </div>
        <el-button type="primary"
                   v-model.trim="form.auth"
                   @click="onGetAuth"
                   :loading="form.authLoading"
                   :disabled="form.authNum > 0"
                   class="w90 h40 plr5 font13"
                   plain>{{form.authNum === 0 ? `${form.authLoading ? '获取中' : '获取验证码'}` : `${form.authNum}s后获取`}}</el-button>
      </div>

      <div v-if="form.type !== 2 && form.type !== 4"
           class="mb10 border-default h42 flex">
        <div class="s-ico s-ico3 h40 w40"></div>
        <input type="password"
               v-model.trim="form.pwd"
               @keyup.enter="onSubmit"
               placeholder="密码"
               class="s-input h40 equal border-none font13" />
      </div>

      <div v-if="form.type === 3 || form.type === 5"
           class="mb10 border-default h42 flex">
        <div class="s-ico s-ico3 h40 w40"></div>
        <input type="password"
               v-model.trim="form.repwd"
               @keyup.enter="onSubmit"
               placeholder="重复密码"
               class="s-input h40 equal border-none font13" />
      </div>
      <div v-if="form.type !== 3"
           class="flex jc-between ai-center h20 mb10">
        <el-checkbox v-if="form.type === 1"
                     v-model.trim="form.rember"><span class="font12">记住密码</span></el-checkbox>
        <el-button v-if="form.type === 1"
                   type="text"
                   @click="form.type = 4"
                   class="font12 s-ptb4 c666">忘记密码？</el-button>
      </div>

      <el-button type="primary"
                 class="w-100"
                 @click="onSubmit"
                 :disabled="form.type === 3 ? !form.agree ? true : false : false"
                 :loading="form.isLoading">{{text[2]}}</el-button>
      <div v-if="form.type === 1 || form.type === 2"
           class="mt10">
        <el-button type="text"
                   @click="form.type = 3"
                   class="font12 s-ptb4 c666">注册新用户</el-button>
      </div>
      <div v-if="form.type === 3">
        <el-checkbox v-model.trim="form.agree"><span class="font12">已阅读并同意</span></el-checkbox>
        <el-button type="text"
                   @click="onUrl(1)"
                   class="font12">《用户协议》</el-button>
        <el-button type="text"
                   @click="onUrl(2)"
                   class="font12 s-ml0">《隐私策略》</el-button>

      </div>
    </div>

    <div style="width: 240px">
      right
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      timeoutNum: null,
      form: {
        type: 1, // 1：账号登录，2：验证码登录，3：新用户注册，4：找回密码，5：找回密码下一步
        msg: '',
        agree: true,
        rember: false,
        isLoading: false,
        user: '',
        auth: '',
        authNum: 0,
        authLoading: false,
        pwd: '',
        repwd: ''
      }
    }
  },
  computed: {
    text() {
      // 主标题，副标题，按钮文本，切换类型
      switch (this.form.type) {
        case 1:
          return ['账号登录', '动态验证码登录', '登录', 2]
        case 2:
          return ['动态验证码登录', '账号登录', '登录', 1]
        case 3:
          return ['注册账号', '登录', '提交', 1]
        case 4:
          return ['找回密码 ', '返回登录', '下一步', 1]
        default:
          return ['重置密码', '返回登录', '提交', 1]
      }
    }
  },
  watch: {
    'form.type': function(val, oldVal) {
      this.form = {
        ...this.form,
        msg: ''
      }
      if (val === 3) {
        this.form = {
          ...this.form,
          user: '',
          auth: '',
          pwd: '',
          repwd: ''
        }
      }
    }
  },
  methods: {
    // 跳转用户协议，隐私策略
    onUrl(type) {
      const path = type === 1 ? 'service' : 'privacy'
      const url = `http://service.inswindows.com/html/loginread/${path}`

      if (this.$ipcR) {
        this.$ipcR.send('open-url', url)
      } else {
        window.open(url)
      }
    },
    // tick auch
    tickAuch() {
      this.timeoutNum = setTimeout(() => {
        if (this.form.authNum > 0) {
          this.form.authNum -= 1
          this.tickAuch()
        } else {
          this.form.authNum = 0
        }
      }, 1000)
    },
    // 获取验证码
    onGetAuth() {
      const { user } = this.form
      if (!this.$utils.common.isMobile(user)) {
        this.form.msg = '手机号格式错误，请检查'
        return null
      }
      this.form.authLoading = true
      this.$axios
        .post('/app/user/sms/send', { noAuth: true, phone: user, usage: 2 })
        .then(res => {
          const { data } = res
          if (data.code === 0) {
            this.$message.success('短信发送成功，请注意查收')
            this.form = {
              ...this.form,
              authLoading: false,
              authNum: 60
            }
            this.tickAuch()
          }
        })
    },
    // 提交表单
    onSubmit() {
      const { type, rember, user, auth, pwd, repwd } = this.form
      const app = this

      const validFn = function(condition, msg) {
        return function() {
          if (condition) {
            app.form.msg = msg
            return false
          }
          return true
        }
      }

      const validUser = validFn(
        !this.$utils.common.isMobile(user),
        '手机号格式错误，请检查'
      )
      const validAuth = validFn(!auth, '验证码不能为空')
      const validPwd = validFn(
        !this.$utils.common.isPwd(pwd),
        '密码长度为8到16个字符，必须且只包含字母、数字'
      )
      const validRepwd = validFn(
        !repwd || repwd !== this.$utils.common.isPwd(pwd),
        '两次密码不一致，请检查'
      )
      // type => 1：账号登录，2：验证码登录，3：新用户注册，4：找回密码，5：找回密码下一步
      if (type === 1 || type === 2) {
        // 账号登录，验证码登录
        if (!validUser()) return
        if (type === 1 && !validPwd()) return
        if (type === 2 && !validAuth()) return
        this.form.msg = ''
        this.$axios
          .post('/app/user/account/login', {
            noAuth: true,
            phone: user,
            type: type === 1 ? 0 : 1,
            ...(type === 1 ? { password: pwd } : { captcha: auth }),
            deviceType: 3,
            deviceName: '127.0.0.1',
            imei: 'pc-mac',
            step: 1
          })
          .then(res => {
            const { data } = res
            if (data.code === 0) {
              if (type === 1) {
                this.$store.commit('user/change', { ...data.data })
                this.$utils.cache.setItem('my', {
                  ...this.$utils.cache.getItem('my'),
                  user,
                  pwd: rember ? pwd : '',
                  rember
                })
              }
              // eslint-disable-next-line
              const { u_id } = data.data
              this.$axios
                .post('/app/im/register', { noAuth: true, u_id })
                .then(res => {
                  const { data } = res
                  if (data.code === 0) {
                    if (this.$ipcR) {
                      this.$ipcR.send('restore-window')
                    }
                    this.$router.push(this.$route.query.from || '/')
                  }
                })
            }
          })
      } else if (type === 3) {
        // 用户注册
        if (!validUser()) return
        if (!validAuth()) return
        if (!validPwd()) return
        if (!validRepwd()) return
        this.form.msg = ''
        this.$axios
          .post('/app/user/account/register', {
            noAuth: true,
            phone: user,
            captcha: auth,
            password: pwd
          })
          .then(res => {
            const { data } = res
            if (data.code === 0) {
              this.$message.success('恭喜你，注册成功！赶紧去登录吧')
              this.form.type = 1
            }
          })
      } else if (type === 4) {
        // 找回密码
        if (!validUser()) return
        if (!validAuth()) return
        this.form.msg = ''
        this.$axios
          .post('/app/user/account/checkcode', {
            noAuth: true,
            phone: user,
            captcha: auth
          })
          .then(res => {
            const { data } = res
            if (data.code === 0) {
              this.form = {
                ...this.form,
                type: 5,
                pwd: '',
                repwd: ''
              }
            }
          })
      } else {
        // 修改密码
        if (!validPwd()) return
        if (!validRepwd()) return
        this.form.msg = ''
        this.$axios
          .post('/app/user/account/updatepwd', {
            noAuth: true,
            phone: user,
            newPassword: pwd
          })
          .then(res => {
            const { data } = res
            if (data.code === 0) {
              this.$message.success('修改密码成功，赶紧登录吧！')
              this.form = {
                ...this.form,
                type: 1,
                pwd: '',
                repwd: ''
              }
            }
          })
      }
    }
  },
  created() {
    const my = this.$utils.cache.getItem('my') || {}
    this.form = {
      ...this.form,
      user: my.user || '',
      pwd: my.pwd || '',
      rember: my.rember || false
    }
  },
  beforeDestroy() {
    if (this.timeoutNum) clearTimeout(this.timeoutNum)
  }
}
</script>

<style scoped>
.s-ptb4 {
  padding-top: 3px;
  padding-bottom: 3px;
}
.s-ml0 {
  margin-left: 0;
}
.s-input {
  min-width: 100px;
}
.s-ico {
  background-image: url('~assets/images/icon3.png');
  background-repeat: no-repeat;
}
.s-ico1 {
  background-position: -70px -159px;
}
.s-ico2 {
  background-position: -70px -261px;
}
.s-ico3 {
  background-position: -70px -209px;
}
</style>
