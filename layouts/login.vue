<template>
  <div class="flex column ai-center jc-center h-full">
    <div class="h60 relative drag s-bg"
         style="width: 688px;">
      <div :class="`s-top-btn s-close no-drag ${isBrowser ? 's-bg-c' : ''}`"
           @click="onQuit"></div>
      <div :class="`s-top-btn s-min no-drag ${isBrowser ? 's-bg-c' : ''}`"
           @click="onMin"></div>
    </div>
    <nuxt />
  </div>
</template>
<script>
export default {
  computed: {
    isBrowser() {
      return !this.$ipcR
    }
  },
  created() {
    // console.log('nooooo')
  },
  methods: {
    onQuit() {
      if (this.$ipcR) {
        this.$ipcR.send('quit-app')
      }
    },
    onMin() {
      if (this.$ipcR) {
        this.$ipcR.send('minimize-window')
      }
    }
  }
}
</script>

<style scoped>
.s-bg-c {
  background: #1f8ee1;
}
.s-bg {
  background: url('~assets/images/icon3.png') 0 -1px no-repeat;
}
.s-top-btn {
  position: absolute;
  z-index: 10;
  top: 22px;
  width: 15px;
  height: 15px;
  cursor: pointer;
}
.s-close {
  right: 22px;
}
.s-min {
  right: 46px;
}
</style>

