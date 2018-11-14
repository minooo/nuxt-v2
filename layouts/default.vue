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
          <img :src="avatar"
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
  data() {
    const { avatar } = this.$store.state.user.base
    return {
      avatar
    }
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
    }
  },
  created() {
    if (this.$ipcR) {
      this.$ipcR.on('move', (event, arg) => {
        this.$store.commit('win/switchSize', arg.isFull || arg.isMax)
      })
    }
    // console.log('layout-default-created', this)
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

