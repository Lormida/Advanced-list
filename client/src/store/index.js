import { createStore } from 'vuex'
import axios from 'axios'
import catchWrapper from './catchWrapper'

const targetURL = 'http://localhost:3000'
const axiosIns = axios.create({
  // withCredentials: true,
})

export default createStore({
  state: {
    englishDict: [],
    currentItemId: null,
    statusPrompt: null,
    messagePrompt: null,
    activatePrompt: false
  },
  getters: {
    getEnglishDict(state) {
      return state.englishDict
    },
    getCurrentItemId(state) {
      return state.currentItemId
    },
    getStatusPrompt(state) {
      return state.statusPrompt
    },
    getMessagePrompt(state) {
      return state.messagePrompt
    },
    getActivatePrompt(state) {
      return state.activatePrompt
    }
  },
  mutations: {
    setEnglishDict(state, dict) {
      state.englishDict = dict
    },
    setCurrentItemId(state, id) {
      state.currentItemId = id
    },
    setStatusPrompt(state, statusPrompt) {
      state.statusPrompt = statusPrompt
    },
    setMessagePrompt(state, messagePrompt) {
      state.messagePrompt = messagePrompt
    },
    setActivatePrompt(state, status) {
      state.activatePrompt = status
    },
    addLocalItem(state, payload) {
      const { _id, origin, translate } = payload
      state.englishDict.push({ _id, origin, translate })
    },
    saveLocalItem(state, payload) {
      const { id, origin, translate } = payload
      let currentIndex = state.englishDict.findIndex(el => el._id == id)
      let currentElement = state.englishDict[currentIndex]
      state.englishDict[currentIndex] = { ...currentElement, origin, translate }
    },
    deleteLocalItem(state, id) {
      state.englishDict = state.englishDict.filter(item => item._id != id)
    }
  },
  actions: {
    // +
    async saveModifiedEnglishPhrase(ctx, newData) {
      return catchWrapper(async () => {
        const { id, origin, translate } = newData
        await axiosIns.patch(`${targetURL}/api/modify-english-phrase/${id}`, {
          origin, translate
        })
      }, 'Success modify and save')

    },

    // +
    async loadEnglishDict(ctx) {
      return catchWrapper(async () => {
        const response = await axiosIns.get(`${targetURL}/api/english-dictionary`)
        const englishDict = response.data
        ctx.commit('setEnglishDict', englishDict)
      }, 'Success loading')
    },

    // +
    async deleteEnglishPhrase(ctx, payload) {
      return catchWrapper(async () => {
        const id = payload.id
        await axiosIns.delete(`${targetURL}/api/delete-english-phrase/${id}`)
        ctx.commit('deleteLocalItem', id)
      }, 'Success deleting')


    },

    // +
    async addEnglishPhrase(ctx, payload) {
      return catchWrapper(async () => {
        const { origin, translate } = payload
        const response = await axiosIns.post(`${targetURL}/api/add-english-phrase/`, {
          origin, translate
        })
        const newData = response.data
        ctx.commit('addLocalItem', newData)
      }, 'Success creating')
    },
    async displayPrompt(ctx, payload) {
      const { statusCode: statusPrompt, message: messagePrompt } = payload
      ctx.commit('setStatusPrompt', statusPrompt)
      ctx.commit('setMessagePrompt', messagePrompt)
      ctx.commit('setActivatePrompt', true)

      setTimeout(() => {
        ctx.commit('setActivatePrompt', false)
      }, 2000)

    }
  },
  modules: {
  }
})
