<template>
  <div class="c-main font16">
    todos
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const data1 = await app.$axios.$get('/poster/theme/lists')
    console.log('data1', data1)
  }
}
</script>
