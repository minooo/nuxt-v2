<template>
  <div style="padding: 20px; width: 688px; height: 374px;">

    <el-form ref="ruleForm"
             :model="ruleForm"
             :rules="rules"
             label-width="100px"
             status-icon>
      <el-form-item label="用户名"
                    prop="user">
        <el-input v-model.trim="ruleForm.user"
                  type="text"
                  autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码"
                    prop="pwd">
        <el-input v-model.trim="ruleForm.pwd"
                  type="password"
                  autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit('ruleForm')">速度很快吗</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名：admin'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码: 123456'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        user: '',
        pwd: ''
      },
      rules: {
        user: [{ validator: validateUser, trigger: 'blur' }],
        pwd: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.$post('/app/login/login', this.ruleForm).then(res => {
            if (res.code === 0) {
              sessionStorage.setItem('__uid__', '1')
              sessionStorage.setItem('__token__', new Date().getTime())
              this.$message.success('登陆成功！')
              if (this.$ipcR) {
                this.$ipcR.send('restore-window')
              }
              this.$router.push(this.$route.query.from || '/')
            }
          })
          console.log('this.ruleForm', this.ruleForm)
        } else {
          console.log('error submit!!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
