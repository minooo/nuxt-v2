<template>
  <div class="flex equal-auto">
    <!-- <logo /> -->
    <!-- 左侧 -->
    <div style="width: 260px"
         class="flex column">
      <div class="equal-flex overflow-y">
        <a href="/login">返回登录</a>
      </div>
      <div class="h60 flex ai-center jc-center border-top">
        <div class="s-add-groupchat flex ai-center jc-center c-main border-default r4 pointer">
          <span class="s-add-groupchat-ico"></span>
          发起群聊
        </div>
      </div>
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

<style scoped>
.s-add-groupchat {
  width: 170px;
  height: 40px;
}
.s-add-groupchat-ico {
  display: inline-block;
  width: 19px;
  height: 19px;
  margin-right: 8px;
  background-image: url('~assets/images/create_group.png');
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>

