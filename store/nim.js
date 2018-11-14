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
  changeTeamMembers(state, { teamId, payload }) {
    state.teamMembers[teamId] = payload
  },
  changeSessions(state, payload) {
    state.sessions = payload
  },
  changeMsgs(state, { sessionId, payload }) {
    state.msgs[sessionId] = payload
  }
}
