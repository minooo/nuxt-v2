<template>
  <div class="flex column h-full s-size-limit">
    <div class="h60 flex jc-between ai-center drag s-bg-img">
      <search></search>
      <div class="flex g-tooltip">
        <nuxt-link to="/">
          <div class="h60 no-drag s-route-ico s-route-ico-1"
               title="消息"></div>
        </nuxt-link>
        <nuxt-link to="/social">
          <div class="h60 no-drag ml10 mr10 s-route-ico s-route-ico-2"
               title="通讯录"></div>
        </nuxt-link>
        <nuxt-link to="/work">
          <div class="h60 no-drag s-route-ico s-route-ico-3"
               title="工作台"></div>
        </nuxt-link>
      </div>
      <div :class="`s-right ${isBrowser ? 's-right-bg-browser' : ''} relative h60`">
        <div class="s-right-avatar pointer no-drag"
             @click="onAvatar">
          <img :src="this.$store.state.user.base.avatar"
               class="h40 w40 circle"
               :onerror="`this.src='avatar.png'`"
               alt="头像">
        </div>
        <div class="w22 h30 pointer no-drag s-right-btn s-right-btn-1"
             :title="`${isBrowser ? '' : '关闭'}`"
             @click="onHide"></div>
        <div class="w22 h30 pointer no-drag s-right-btn s-right-btn-2"
             :title="`${isBrowser ? '' : this.$store.state.win.maximize ? '还原' : '最大化'}`"
             @click="onSwitchSize"></div>
        <div class="w22 h30 pointer no-drag s-right-btn s-right-btn-3"
             :title="`${isBrowser ? '' : '最小化'}`"
             @click="onMini"></div>
        <div class="w22 h30 pointer no-drag s-right-btn s-right-btn-4"
             title="菜单"
             @click="onMenu"></div>
      </div>
    </div>
    <nuxt />
  </div>
</template>

<script>
import Search from '~/components/Search.vue'

export default {
  components: {
    Search
  },
  computed: {
    isBrowser() {
      return !this.$ipcR
    }
  },
  methods: {
    onAvatar() {
      alert(123)
    },
    onMenu() {},
    onMini() {
      if (this.$ipcR) {
        this.$ipcR.send('minimize-window')
      }
    },
    onSwitchSize() {
      if (this.$ipcR) {
        if (this.$store.state.win.maximize) {
          this.$ipcR.send('unmaximize-window')
        } else {
          this.$ipcR.send('maximize-window')
        }
      }
    },
    onHide() {
      if (this.$ipcR) {
        this.$ipcR.send('hide-window')
      }
    },

    // NIM 所有的函数
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
          console.log(
            'SDK 处于断开状态，账号或者密码错误, 请跳转到登录页面并提示错误'
          )
          this.$message.error('您当前账号无法启用 IM，请检查！')
          setTimeout(() => (window.location.href = '/login'), 1000)
          break
        case 417:
          console.log(
            '重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误'
          )
          this.$message.error('检测到您已经在其它端登录了，请注意账号安全')
          setTimeout(() => (window.location.href = '/login'), 1000)
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
      const newTeams = window.nim.mergeTeams(this.$store.state.nim.teams, teams)
      this.$store.commit('nim/changeTeams', newTeams)
    },
    onSyncCreateTeam(team) {
      console.log('创建群的回调', team)
      const newTeams = window.nim.mergeTeams(this.$store.state.nim.teams, team)
      this.$store.commit('nim/changeTeams', newTeams)
    },
    onTeamMembers(data) {
      const { teamId, members } = data
      console.log('群id', teamId, '群成员', members)

      const data1 = window.nim.mergeTeamMembers(
        this.$store.state.nim.teamMembers[teamId],
        members
      )
      this.$store.commit('nim/changeTeamMembers', { teamId, data1 })

      const data2 = window.nim.cutTeamMembers(
        this.$store.state.nim.teamMembers[teamId],
        members.invalid
      )
      this.$store.commit('nim/changeTeamMembers', { teamId, data2 })
    },
    onUpdateTeamMember(teamMember) {
      console.log('群成员信息更新了', teamMember)
    },
    // 会话
    onSessions(sessions) {
      console.log('收到会话列表', sessions)
      const data = window.nim.mergeSessions(
        this.$store.state.nim.sessions,
        sessions
      )
      this.$store.commit('nim/changeSessions', data)
      this.$store.dispatch('nim/updateSessions')
    },
    onUpdateSession(session) {
      console.log('会话更新了', session)
      const data = window.nim.mergeSessions(
        this.$store.state.nim.sessions,
        session
      )
      this.$store.commit('nim/changeSessions', data)
      this.$store.dispatch('nim/updateSessions')
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
      if (!Array.isArray(msgs)) {
        msgs = [msgs]
      }
      if (msgs.length === 0) return
      const sessionId = msgs[0].sessionId
      const data = window.nim.mergeMsgs(
        this.$store.state.nim.msgs[sessionId],
        msgs
      )
      console.log('dataaaa', data)

      this.$store.commit('nim/changeMsgs', { sessionId, data })
    }
  },
  created() {
    // 处理窗口最大化/恢复的逻辑
    if (this.$ipcR) {
      this.$ipcR.on('move', (event, arg) => {
        this.$store.commit('win/switchSize', arg.isFull || arg.isMax)
      })
    }

    // 处理NIM的逻辑
    // eslint-disable-next-line
    const { u_id } = this.$store.state.user.base

    // 参考文档
    // https://dev.yunxin.163.com/docs/product/IM%E5%8D%B3%E6%97%B6%E9%80%9A%E8%AE%AF/SDK%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/Web%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/%E5%88%9D%E5%A7%8B%E5%8C%96
    window.nim = window.NIM.getInstance({
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
  },
  mounted() {
    // console.log('layout-default-mounter', this)
  }
}
</script>
<style>
.nuxt-link-exact-active .s-route-ico-1 {
  background-position: -347px -73px !important;
}
.nuxt-link-exact-active .s-route-ico-2 {
  background-position: -421px -70px !important;
}
.nuxt-link-exact-active .s-route-ico-3 {
  background-position: -490px -71px !important;
}
</style>


<style scoped>
.s-size-limit {
  min-width: 912px;
  min-height: 695px;
}
.s-bg-c {
  background: rgb(29, 140, 224);
}
.s-bg-img {
  background-image: url('~assets/images/icon.png');
  background-repeat: no-repeat;
  background-color: rgb(29, 140, 224);
}
.s-route-ico {
  width: 53px;
  background-image: url('~assets/images/icon.png');
  background-repeat: no-repeat;
}
.s-route-ico-1 {
  background-position: -349px -129px;
}
.s-route-ico-2 {
  background-position: -424px -129px;
}
.s-route-ico-3 {
  background-position: -495px -129px;
}
.s-right {
  width: 200px;
  background-image: url('~assets/images/icon.png');
  background-position: right -122px;
  padding-right: 86px;
}
.s-right-bg-browser {
  background-clip: content-box;
}
.s-right-avatar {
  position: absolute;
  left: 11px;
  top: 10px;
}
.s-right-btn {
  position: absolute;
  top: 15px;
}
.s-right-btn-1 {
  right: 12px;
}
.s-right-btn-2 {
  right: 35px;
}
.s-right-btn-3 {
  right: 59px;
}
.s-right-btn-4 {
  right: 83px;
}
</style>

