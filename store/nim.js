// 无论模式如何，state 应始终是一个函数，以避免服务器端不需要的共享状态
export const state = () => ({
  teams: [],
  teamMembers: {},
  sessions: [],
  msgs: {}
})

// 更改 store 中状态的唯一方法就是提交 mutation
export const mutations = {
  changeTeams(state, payload) {
    state.teams = payload
  },
  changeTeamMembers(state, { teamId, ...rest }) {
    state.teamMembers[teamId] = rest.data1 || rest.data2
  },
  changeSessions(state, payload) {
    console.log('store 会话更新新。。。', payload)
    state.sessions = payload
  },
  changeMsgs(state, { sessionId, data }) {
    console.log('payyyy', data)
    state.msgs[sessionId] = data
  }
}

// Action 类似于 mutation，不同在于：
// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。
export const actions = {
  updateSessions({ commit, state }) {
    console.log('ssss', state)
    const { sessions } = state
    let arr = sessions && sessions.length > 0 ? sessions.map(x => x.to) : []
    if (arr.length > 0) {
      console.log('arr', arr)
      window.nim.getUsers({
        accounts: arr,
        done(error, user) {
          console.log('33', error)
          console.log('44', user)
          console.log('获取用户资料' + (!error ? '成功' : '失败'))
        }
      })
    }
    // window.nim.getUsers({
    //   accounts: arr,
    //   done(error, user) {
    //     console.log('33', error)
    //     console.log('44', user)
    //     console.log('获取用户资料' + (!error ? '成功' : '失败'))
    //   }
    // })
  }
}
