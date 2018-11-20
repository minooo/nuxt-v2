<template>
  <div class="flex ptb30 column ai-center">
    <h1 v-if="error.statusCode === 404">抱歉页面未找到</h1>
    <h1 v-else>抱歉，程序发生错误</h1>
    <a href="/login">返回登录</a>
    <nuxt-link to="/"
               class="mt20">返回首页</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
