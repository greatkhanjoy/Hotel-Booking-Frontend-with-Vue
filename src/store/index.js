import axios from 'axios'
import { createStore } from 'vuex'
// const url = 'https://hotelbooking-joy.herokuapp.com'
const url = 'http://localhost:5050'

const store = createStore({
  state: {
    user: {},
    authenticated: false,
    fakeData: '',
  },
  getters: {
    isLoggedIn: (state) => {
      return state.authenticated
    },
    userName: (state) => {
      if (state.user.name) {
        return state.user.name
      } else {
        return ''
      }
    },
  },
  actions: {
    register({ commit }, user) {
      return axios
        .post(`${url}/api/auth/register`, user)
        .then((res) => {
          commit('setUser', res.data)
          return { status: res.status, message: res.data.message }
        })
        .catch((err) => {
          return {
            status: err.response.status,
            message: err.response.data.message,
          }
        })
    },
    login({ commit }, user) {
      return axios
        .post(`${url}/api/auth/login`, user, {
          withCredentials: true,
        })
        .then((res) => {
          commit('setUserData', res.data.user)
          return {
            status: res.status,
            message: res.data.message,
          }
        })
        .catch((err) => {
          return {
            status: err.response.status,
            message: err.response.data.message,
          }
        })
    },
    verify({ commit }, user) {
      return axios
        .post(`${url}/api/auth/verify`, user)
        .then((res) => {
          commit('setUser', res.data)
          return { status: res.status, message: res.data.message }
        })
        .catch((err) => {
          return {
            status: err.response.status,
            message: err.response.data.message,
          }
        })
    },
    forgotPassword({ commit }, user) {
      return axios
        .post(`${url}/api/auth/forgot-password`, user)
        .then((res) => {
          return { status: res.status, message: res.data.message }
        })
        .catch((err) => {
          return {
            status: err.response.status,
            message: err.response.data.message,
          }
        })
    },
    verifyResetLink({ commit }, user) {
      return axios
        .post(`${url}/api/auth/verify-reset-link`, user)
        .then((res) => {
          return { status: res.status, message: res.data.message }
        })
        .catch((err) => {
          return {
            status: err.response.status,
            message: err.response.data.message,
          }
        })
    },
    resetPassword({ commit }, user) {
      return axios
        .post(`${url}/api/auth/reset-password`, user)
        .then((res) => {
          return { status: res.status, message: res.data.message }
        })
        .catch((err) => {
          return {
            status: err.response.status,
            message: err.response.data.message,
          }
        })
    },
    logout({ commit }) {
      return axios
        .get(`${url}/api/auth/logout`, { withCredentials: true })
        .then((res) => {
          commit('destroyUserData')
          console.log(res)
          return { status: res.status, message: res.data.message }
        })
        .catch((err) => {
          console.log(err)
          // return {
          //   status: err.response.status,
          //   message: err.response.data.message,
          // }
        })
    },
    getUser({ commit }) {
      return axios
        .get(`${url}/api/users/me`, {
          withCredentials: true,
        })
        .then((res) => {
          commit('setUserData', res.data.user)
          return { status: res.status, message: res.data.message }
        })
        .catch((err) => {
          return {
            status: err.response.status,
            message: err.response.data.message,
          }
        })
    },
  },
  mutations: {
    destroyUserData(state) {
      state.user = null
      state.authenticated = false
    },
    setUserData(state, user) {
      state.user = user
      state.authenticated = true
    },
    setUser(state, user) {
      state.fakeData = user
    },
  },
  modules: {},
})

export default store
