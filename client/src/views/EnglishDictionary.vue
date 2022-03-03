<template>
  <div class="container english">
    <section class="english__add-wrapper">
      <p class="english__add-title">Add new phrase</p>
      <div class="english__add-button" @click="openModal"></div>
    </section>

    <ul class="english__list">
      <english-item
        :idx="idx"
        :triggerFold="triggerFold"
        :engItem="engItem"
        v-for="(engItem, idx) of getEnglishDict"
        :key="engItem.id"
        @off-trigger-fold="offTriggerFold"
      ></english-item>
    </ul>

    <modal-window
      @close-modal="closeModal"
      :statusModal="getModalWindowOpen"
    ></modal-window>
    <!-- <Loader></Loader> -->
    <prompt
      v-if="activatedPrompt"
      :status="getPromptStatus"
      :message="getPromptMessage"
    ></prompt>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, computed, ref } from 'vue'
import EnglishItem from '../components/EnglishItem.vue'
import ModalWindow from '../components/ModalWindow.vue'
import Loader from '../components/Loader.vue'
import Prompt from '../components/Prompt.vue'

export default {
  components: {
    EnglishItem,
    ModalWindow,
    Loader,
    Prompt
  },

  setup() {

    let modalWindowOpen = ref(false)
    let currentIsOrigin = ref(true)
    let triggerFoldValue = ref(false)
    let activatedPrompt = ref(true)

    const offTriggerFold = () => {
      triggerFoldValue.value = false
    }

    const triggerFold = computed(() => {
      return triggerFoldValue.value
    })
    const store = useStore()

    const toggleTranslate = (e) => {
      currentIsOrigin.value = !currentIsOrigin.value
    }

    const getEnglishDict = computed(() => {
      return store.getters.getEnglishDict
    })

    const closeModal = () => {
      modalWindowOpen.value = false
    }

    const openModal = () => {
      modalWindowOpen.value = true
    }

    const getModalWindowOpen = computed(() => {
      return modalWindowOpen.value
    })

    const getPromptStatus = computed(() => {
      return store.getters.getPromptStatus
    })

    const getPromptMessage = computed(() => {
      return store.getters.getPromptMessage
    })

    document.body.addEventListener('keydown', e => {
      if ((e.key.toUpperCase() == 'S' || e.key.toUpperCase() == 'Ы') && e.ctrlKey) {
        e.preventDefault()
        const currentId = store.getters.getCurrentItemId
        const { _id, origin, translate } = (store.getters.getEnglishDict.find(item => item._id == currentId))

        store.dispatch('saveModifiedEnglishPhrase', { id: _id, origin, translate })
          .then(statusText => console.log(statusText))
          .catch((err) => console.log('Failure : ', err))

        triggerFoldValue.value = true
      }
    })

    onMounted(() => {
      store.dispatch('loadEnglishDict')
        .then(statusText => console.log(statusText))
        .catch((err) => console.log('Failure : ', err))
    })

    return {
      getEnglishDict, toggleTranslate, currentIsOrigin,
      openModal, closeModal, modalWindowOpen, getModalWindowOpen,
      triggerFold, triggerFoldValue, offTriggerFold, activatedPrompt,
      getPromptStatus, getPromptMessage
    }
  }
}
</script>
<style lang='scss' scoped>
.container {
}
.english {
  // .english__add-wrapper

  &__add-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    width: fit-content;
    margin: 0 auto;
    border-radius: 0.1rem;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 2rem 4rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  // .english__add-title

  &__add-title {
    font-size: 3rem;
  }

  // .english__add-button

  &__add-button {
    display: block;
    content: "";
    height: 10rem;
    width: 10rem;
    background-color: rgba(0, 0, 0, 0.4);
    mask-image: url("../assets/svg/add.svg");
    transition: all 0.5s ease;
    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 1);
    }
  }

  // .english__list

  &__list {
    width: 80%;
    margin: 5rem auto;
    // border: 2px solid #fff;
  }
}
</style>
