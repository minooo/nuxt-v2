<template>
  <div class="flex h62 pl10 ai-center s-hover">
    <img :src="data.avatar"
         class="h42 w42 circle mr10 equal-no"
         :onerror="`this.src='avatar.png'`"
         alt="头像">
    <dl class="equal-auto text-overflow-one">
      <dt class="font14 c333 mb5">{{data.nick}}</dt>
      <dd class="font12 c999">{{data.lastMsg.text}}</dd>
    </dl>
    <dl class="equal-no">
      <dt class="font14 c333 mb5">{{data.updateTime}}</dt>
      <dd class="font12 c999 bg-main">{{data.unread}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    closeDiv() {
      this.$emit('update:show', false) // 触发 input 事件，并传入新值
    }
  }
}
</script>

<style scoped>
.s-hover:hover {
  background: rgb(245, 245, 245);
}
</style>
