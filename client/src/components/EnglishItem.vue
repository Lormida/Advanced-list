<template>
  <li class="english__phrase-wrapper">
    <div class="english__phrase-id">{{ idx + 1 }}</div>

    <div class="english__phrase-container">
      <input
        class="english__phrase-origin input-english"
        @focus="updateCurrentItemId"
        type="text"
        v-model="engItemOrigin"
        @click.self="toggleTranslate"
      />

      <input
        v-if="currentIsOrigin == false"
        class="english__phrase-translate input-english"
        @focus="updateCurrentItemId"
        type="text"
        v-model="engItemTranslate"
      />
    </div>

    <div class="english__phrase-editor">
      <div class="english__phrase-delete" @click="deleteItem"></div>
      <div class="english__phrase-save" @click="saveItem"></div>
    </div>
  </li>
</template>
<script>
import { useStore } from 'vuex'
import { onMounted, computed, ref, watch } from 'vue'
export default {
  props: ['idx', 'engItem', 'triggerFold'],
  emits: ['off-trigger-fold'],
  name: 'EnglishItem',

  setup(props, ctx) {



    let currentIsOrigin = ref(true)
    let engItemOrigin = ref(props.engItem.origin)
    let engItemTranslate = ref(props.engItem.translate)
    let engItemId = ref(props.engItem._id)
    let activatedPrompt = ref(false)


    const store = useStore()

    const toggleTranslate = (e) => {
      currentIsOrigin.value = !currentIsOrigin.value
    }

    const deleteItem = () => {
      store.dispatch('deleteEnglishPhrase', {
        id: engItemId.value,
      })
        .catch(err => err)
        .then(({ statusCode, message }) => {
          store.dispatch('displayPrompt', { statusCode, message })
        })
    }

    const saveItem = () => {
      store.dispatch('saveModifiedEnglishPhrase', {
        id: engItemId.value,
        origin: engItemOrigin.value,
        translate: engItemTranslate.value
      })
        .then(({ statusCode, message, error }) => {
          if (error) {
            store.dispatch('displayPrompt', { statusCode, message })
          }
        })

      currentIsOrigin.value = true
    }

    const updateCurrentItemId = () => {
      // Update focused id
      store.commit('setCurrentItemId', engItemId.value)
    }
    watch([engItemOrigin, engItemTranslate], ([origin, translate], [_1, _2]) => {
      const id = store.getters.getCurrentItemId
      store.commit('saveLocalItem', {
        id, origin, translate
      })
    })

    watch(() => props.triggerFold, (oldVal, newVal) => {
      currentIsOrigin.value = true
      ctx.emit('off-trigger-fold')
    })

    return {
      toggleTranslate, currentIsOrigin, deleteItem,
      saveItem, engItemId, engItemOrigin, engItemTranslate, updateCurrentItemId
    }
  }
}

</script>
<style lang='scss' scoped>
.input-english {
  margin: 0.5rem 0;
  width: 100%;
  color: #fff;
  outline: none;
  border: none;
  padding-left: 1rem;
  height: 60px;
  display: flex;
  align-items: center;
}

input:focus {
  background-color: rgba(34, 34, 59, 0.8);
}

// .english__phrase-wrapper

.english {
  &__phrase-wrapper {
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    display: flex;
    border-radius: 5px;
    list-style: none;
    border: 3px solid #fff;
    margin: 2rem 0;
    min-height: 80px;
    height: fit-content;
  }

  // .english__phrase-id

  &__phrase-id {
    flex-basis: 5%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 1.5%;
    font-size: 3rem;
    border-right: 3px solid rgba(255, 255, 255, 0.3);
  }

  // .english__phrase-container

  &__phrase-container {
    flex-basis: 80%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 2.5%;
    font-size: 2rem;
    transition: all 0.3s ease;
  }

  // .english__phrase-origin

  &__phrase-origin {
    background-color: transparent;
    &:hover {
      cursor: pointer;
    }
  }

  &__phrase-translate {
    background-color: rgba(229, 33, 101, 0.08);
    font-style: italic;
    border-top: 3px solid rgba(255, 255, 255, 0.7);
  }

  // .english__phrase-editor

  &__phrase-editor {
    padding-right: 2rem;
    flex-basis: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  // .english__phrase--arrow
  &__phrase-arrow {
    height: 100%;
    background: rgba(22, 22, 22, 0.3);
    padding: 0 0.5rem;
  }

  // .english__phrase-delete

  &__phrase-delete {
    display: block;
    content: url("../assets/svg/remove.svg");
    height: 4rem;
    width: 4rem;
    // background-color: transparent ;
    // mask-image: url("../assets/svg/remove.svg");
    transition: all 0.5s ease;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
  }

  // .english__phrase-save

  &__phrase-save {
    display: block;
    content: "";
    height: 4rem;
    width: 4rem;
    background-color: rgba(0, 0, 0, 0.4);
    mask-image: url("../assets/svg/save.svg");
    transition: all 0.5s ease;
    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 1);
    }
  }
}
</style>