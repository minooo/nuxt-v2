<template>
  <div class="flex h-100">
    <!-- <logo /> -->
    <!-- 左侧 -->
    <div style="width: 260px"
         class="bg-main">123</div>

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
      name: 'df'
    }
  },
  async asyncData({ app }) {
    // const ip = await app.$axios.$get('http://icanhazip.com')
    // return { ip }
  },
  head() {
    return {
      script: [{ src: '/js/NIM_Web_NIM_v5.7.0.js' }]
    }
  }
}
</script>

<style>
</style>
