// 无论模式如何，state 应始终是一个函数，以避免服务器端不需要的共享状态
export const state = () => ({ base: {} })

// 更改 store 中状态的唯一方法就是提交 mutation
export const mutations = {
  change(state, payload) {
    state.base = { ...state.base, ...payload }
  }
}
