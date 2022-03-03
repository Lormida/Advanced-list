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
    promptStatus: null,
    promptMessage: null
  },
  getters: {
    getEnglishDict(state) {
      return state.englishDict
    },
    getCurrentItemId(state) {
      return state.currentItemId
    },
    getPromptStatus(state) {
      return state.promptStatus
    },
    getPromptMessage(state) {
      return state.promptMessage
    }
  },
  mutations: {
    setEnglishDict(state, dict) {
      state.englishDict = dict
    },
    setCurrentItemId(state, id) {
      state.currentItemId = id
    },
    setPromptStatus(state, promptStatus) {
      state.promptStatus = promptStatus
    },
    setPromptMessage(state, promptMessage) {
      state.promptMessage = promptMessage
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
    }
  },
  modules: {
  }
})
