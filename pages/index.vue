<template>
  <div class="flex equal-auto">
    <!-- <logo /> -->
    <!-- 左侧 -->
    <div style="width: 260px"
         class="flex column">
      <div class="equal-flex overflow-y">
        <a href="/login">返回登录</a>
        <el-button @click="onSendMsg">发送个消息试试</el-button>
        <el-button @click="onGetUser">试试获取用户信息</el-button>

      </div>
      <div class="h60 flex ai-center jc-center border-top">
        <div class="s-add-groupchat flex ai-center jc-center c-main border-default r4 pointer">
          <span class="s-add-groupchat-ico"></span>
          发起群聊
        </div>
        <select-member :show='showSelectMember'></select-member>
      </div>
    </div>

    <!-- 右侧 -->
    <div class="equal-auto bg-second">33</div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import SelectMember from '~/components/SelectMember.vue'
// import SessionList from '~/components/SelectMember.vue'

export default {
  components: {
    Logo,
    SelectMember
  },
  data() {
    return {
      showSelectMember: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 我的id 100154，其他id 18638531028 => 100150
    // 另外两个账号 18638531028/13621029697 密码：123456aa

    onSendMsg() {
      window.nim.sendText({
        scene: 'p2p',
        to: '100600',
        text: 'hello, xiangju.',
        // custom: `{avatar: ${this.$store.state.user.base.avatar}}`,
        done(error, msg) {
          console.log(
            '发送' +
              msg.scene +
              ' ' +
              msg.type +
              '消息' +
              (!error ? '成功' : '失败') +
              ', id=' +
              msg.idClient,
            error,
            msg
          )
        }
      })
    },
    onGetUser() {
      window.nim.getUsers({
        accounts: ['100154', '100500', '100150'],
        done(error, user) {
          console.log(error)
          console.log(user)
          console.log('获取用户资料' + (!error ? '成功' : '失败'))
        }
      })
    }
  },
  created() {},
  mounted() {
    console.log('what in this1', this)
    // eslint-disable-next-line
    const { u_id } = this.$store.state.user.base
    this.$axios.post('/app/im/myGroupList', { u_id })
  }
}
</script>

<style scoped>
.s-add-groupchat {
  width: 170px;
  height: 40px;
}
.s-add-groupchat-ico {
  display: inline-block;
  width: 19px;
  height: 19px;
  margin-right: 8px;
  background-image: url('~assets/images/create_group.png');
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>

