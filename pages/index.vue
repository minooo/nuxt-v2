<template>
  <div class="flex h-100">
    <!-- <logo /> -->
    <!-- 左侧 -->
    <div style="width: 260px"
         class="bg-main">123<nuxt-link to="/login">登录</nuxt-link>
    </div>

    <!-- 右侧 -->
    <div class="equal-auto bg-second">33</div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      nim: null,
      nimData: {
        teamMembers: {},
        msgs: {}
      },
      chatuser: {}
    }
  },
  async asyncData({ app }) {
    // const ip = await app.$axios.$get('http://icanhazip.com')
    // return { ip }
  },
  computed: {},
  watch: {},
  methods: {
    // 初始化
    onConnect(data) {
      console.log('连接建立成功了！', data)
    },
    onWillReconnect(data) {
      // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
      console.log('即将重连')
      console.log(data.retryCount)
      console.log(data.duration)
    },
    onDisconnect(data) {
      // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
      switch (data.code) {
        case 302:
          console.log('账号或者密码错误, 请跳转到登录页面并提示错误')
          break
        case 417:
          console.log(
            '重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误'
          )
          break
        case 'kicked':
          console.log('被踢, 请提示错误后跳转到登录页面')
          break
        default:
          break
      }
    },
    onerror(err) {
      console.log('im发生错误', err)
    },
    // 群组
    onTeams(teams) {
      console.log('收到群列表', teams)
      this.nimData.teams = this.nim.mergeTeams(this.nimData.teams, teams)
    },
    onSyncCreateTeam(team) {
      console.log('你创建了一个群', team)
      this.nimData.teams = this.nim.mergeTeams(this.nimData.teams, team)
    },
    onTeamMembers(data) {
      const { teamId, members } = data
      console.log('群id', teamId, '群成员', members)
      this.nimData.teamMembers[teamId] = this.nim.mergeTeamMembers(
        this.nimData.teamMembers[teamId],
        members
      )
      this.nimData.teamMembers[teamId] = this.nim.cutTeamMembers(
        this.nimData.teamMembers[teamId],
        members.invalid
      )
    },
    onUpdateTeamMember(teamMember) {
      console.log('群成员信息更新了', teamMember)
    },
    // 会话
    onSessions(sessions) {
      console.log('收到会话列表', sessions)
      this.nimData.sessions = this.nim.mergeSessions(
        this.nimData.sessions,
        sessions
      )
    },
    onUpdateSession(session) {
      console.log('会话更新了', session)
      this.nimData.sessions = this.nim.mergeSessions(
        this.nimData.sessions,
        session
      )
    },
    // 消息
    onRoamingMsgs(obj) {
      console.log('漫游消息', obj)
      this.pushMsg(obj.msgs)
    },
    onOfflineMsgs(obj) {
      console.log('离线消息', obj)
      this.pushMsg(obj.msgs)
    },
    onMsg(msg) {
      console.log('收到消息', msg.scene, msg.type, msg)
      this.pushMsg(msg)
    },

    pushMsg(msgs) {
      if (Array.isArray(msgs)) {
        msgs = [msgs]
      }
      if (msgs.length === 0) return
      const sessionId = msgs[0].sessionId
      this.nimData.msgs[sessionId] = this.nim.mergeMsgs(
        this.nimData.msgs[sessionId],
        msgs
      )
    }
  },
  created() {
    // eslint-disable-next-line
    const { u_id } = this.$store.state.user.base

    // 参考文档
    // https://dev.yunxin.163.com/docs/product/IM%E5%8D%B3%E6%97%B6%E9%80%9A%E8%AE%AF/SDK%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/Web%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/%E5%88%9D%E5%A7%8B%E5%8C%96
    this.nim = window.NIM.getInstance({
      // 初始化
      debug: false,
      appKey: '73ee59c4c9b6bc9d90bc5041239a6162',
      account: u_id,
      token: u_id,
      onconnect: this.onConnect, // 连接建立后的回调
      onwillreconnect: this.onWillReconnect, // 即将重连的回调
      ondisconnect: this.onDisconnect, // 断开连接后的回调
      onerror: this.onError, // 发生错误的回调, 会传入错误对象
      // 群组
      onteams: this.onTeams, // 同步群列表的回调
      onsynccreateteam: this.onSyncCreateTeam, // 当前登录用户在其它端创建群后的回调, 会传入群对象
      onteammembers: this.onTeamMembers, // 同步群成员的回调, 一个群对应一个回调, 会传入群成员数组
      onupdateteammember: this.onUpdateTeamMember, // 群成员信息更新后的回调, 会传入群成员对象
      // 会话
      onsessions: this.onSessions, // 同步最近会话列表回调, 会传入会话列表, 按时间正序排列
      onupdatesession: this.onUpdateSession, // 更新会话的回调, 会传入会话
      // 消息
      onroamingmsgs: this.onRoamingMsgs, // 同步漫游消息的回调, 每个会话对应一个回调, 会传入消息数组
      onofflinemsgs: this.onOfflineMsgs, // 同步离线消息的回调, 每个会话对应一个回调, 会传入消息数组
      onmsg: this.onMsg // 收到消息的回调, 会传入消息对象
    })
  }
}
</script>

<style>
</style>
