<template>
  <section class="container">
    <div>
      <logo />
      <el-button type="primary"
                 plain>
        hello world {{ ip }}
      </el-button>
      <h1 class="title">
        2-nuxt-v2123
      </h1>
      <h2 class="subtitle">
        My scrumtrulescent Nuxt.js project
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/"
           target="_blank"
           class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js"
           target="_blank"
           class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
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
    const ip = await app.$axios.$get('http://icanhazip.com')
    return { ip }
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
