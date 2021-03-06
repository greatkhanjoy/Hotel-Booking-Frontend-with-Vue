import axios from 'axios'
import { createStore } from 'vuex'
// const url = 'https://hotelbooking-joy.herokuapp.com'
const url = 'http://localhost:5050'

const store = createStore({
  state: {
    user: {},
    authenticated: false,
    fakeData: '',
    site_url: url,
    selectedDates: null,
    days: null,
    displaySignInModal: false,
  },
  getters: {
    isLoggedIn: (state) => {
      return state.authenticated
    },
    isAdmin: (state) => {
      if (state.user.role === 'admin') {
        return true
      }
    },
    userName: (state) => {
      if (state.user) {
        return state.user.name
      } else {
        return ''
      }
    },
    userImage: (state) => {
      if (state.user) {
        return state.user.image
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
    setdisplaySignInModal(state, payload) {
      state.displaySignInModal = payload
    },
    setDates(state, dates) {
      const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
      const timeDiff = Math.abs(dates[1].getTime() - dates[0].getTime())
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
      state.days = diffDays
      state.selectedDates = dates
    },
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
