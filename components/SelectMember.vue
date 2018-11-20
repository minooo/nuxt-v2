<template>
  <div v-if="show"
       class="s-box">
    <p>默认初始值是{{show}}，所以是显示的</p>
    <button @click.stop="closeDiv">关闭</button>
  </div>
</template>

<script>
export default {
  props: ['show'],
  methods: {
    closeDiv() {
      this.$emit('update:show', false) // 触发 input 事件，并传入新值
    }
  }
}
</script>

<style scoped>
.s-box {
  position: fixed;
  width: 680px;
  height: 457px;
  background: red;
}
</style>
