// 无论模式如何，state 应始终是一个函数，以避免服务器端不需要的共享状态
export const state = () => ({
  count: 0,
  list: [
    { id: 1, title: 'aaa', done: false },
    { id: 2, title: 'bbb', done: true }
  ]
})

// 有时候需要从 store 中的 state 中派生出一些状态
export const getters = {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  },
  // 也可以接受其他 getter 作为第二个参数
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  },
  // 通过方法访问
  getTodoById: state => id => {
    return state.todos.find(todo => todo.id === id)
  }
}

// 更改 store 中状态的唯一方法就是提交 mutation
export const mutations = {
  increment(state) {
    state.count++
  },
  incrementP(state, payload) {
    state.count += payload.amount
  }
}

// Action 类似于 mutation，不同在于：
// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。
export const actions = {
  incrementAsync({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  },
  actionA({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  }
}
