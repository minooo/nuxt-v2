<template>
  <div class="flex column h-full">
    <div class="h60 bg-main flex jc-between ai-center">
      <div>搜索</div>
      <div>
        <nuxt-link to="/">消息</nuxt-link>
        <nuxt-link to="/social">通讯录</nuxt-link>
        <nuxt-link to="/work">工作台</nuxt-link>
      </div>
      <div>个人中心，关闭等</div>
    </div>
    <nuxt />
  </div>
</template>
