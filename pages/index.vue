<template>
  <div class="flex equal-auto">
    <!-- <logo /> -->
    <!-- 左侧 -->
    <div style="width: 260px"
         class="bg-main">
      123
      <div>会话1数据
      </div>
      <a href="/login">返回登录</a>
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
    return {}
  },
  async asyncData({ app }) {
    // const ip = await app.$axios.$get('http://icanhazip.com')
    // return { ip }
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    console.log('what in this1', this)
    // eslint-disable-next-line
    const { u_id } = this.$store.state.user.base
    this.$axios.post('/app/im/myGroupList', { u_id })
  }
}
</script>

<style>
</style>
