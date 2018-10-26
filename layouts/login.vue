<template>
  <div>
    <div class="h60 relative drag s-bg">
      <div class="s-top-btn s-close no-drag"
           @click="onQuit"></div>
      <div class="s-top-btn s-min no-drag"
           @click="onMin"></div>
    </div>
    <nuxt />
  </div>
</template>
<script>
export default {
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

