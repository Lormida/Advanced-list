<template>
  <div v-if="statusModal">
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <span class="modal__btn-close" @click="closeModal"></span>
        <!-- <header class="modal__header">Header</header> -->

        <form class="modal__body">
          <div class="input-wrapper">
            <input
              class="input-wrapper__origin"
              v-model="originValue"
              id="origin"
              placeholder="Enter a origin phrase"
              type="text"
            />
          </div>

          <div class="input-wrapper">
            <input
              class="input-wrapper__translate"
              v-model="translateValue"
              id="translate"
              placeholder="Enter a translate phrase"
              type="text"
            />
          </div>

          <button
            type="submit"
            class="input-wrapper__addItem"
            @click.prevent="addItem"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
  props: ['statusModal'],
  emits: ['close-modal'],
  setup(props, ctx) {
    let originValue = ref("")
    let translateValue = ref("")
    const store = useStore()

    const addItem = () => {
      if (originValue.value && translateValue.value) {
        store.dispatch('addEnglishPhrase', {
          origin: originValue.value,
          translate: translateValue.value
        })
          .catch(err => err)
          .then(({ statusCode, message, error }) => {
            if (error) {
              store.dispatch('displayPrompt', { statusCode, message })
            }
          })

        originValue.value = ''
        translateValue.value = ''
        closeModal()
      }

    }

    const closeModal = () => {
      ctx.emit('close-modal')
    }

    return { closeModal, originValue, translateValue, addItem }
  }
}
</script>
<style lang='scss' scoped>
.modal-overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #ffcad4;
  top: -10vh;
  width: 55%;
  height: 40vh;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  border-radius: 1%;
  .modal__btn-close {
    position: absolute;
    top: 5%;
    right: 3%;
    display: block;
    content: "";
    mask-image: url("../assets/svg/close.svg");
    height: 3rem;
    width: 3rem;
    transition: all 0.5s ease;
    background-color: rgba(13, 19, 33, 0.4);
    outline: none;
    // mask-image: url("../assets/svg/remove.svg");
    &:hover {
      cursor: pointer;
      transform: rotate(90deg) scale(1.3);
      background-color: rgba(13, 19, 33, 1);
    }
  }

  // .modal__header

  &__header {
  }

  // .modal__body

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60%;

    .input-wrapper {
      display: flex;
      justify-content: center;
      width: 100%;

      // .input-wrapper__origin

      &__origin {
        width: 80%;
        font-size: 2rem;
        height: 50px;
        padding-left: 1rem;
      }

      // .input-wrapper__translate

      &__translate {
        width: 80%;
        font-size: 2rem;
        height: 50px;
        padding-left: 1rem;
      }

      // .input-wrapper__addItem

      &__addItem {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40%;
        height: 50px;
        font-family: "Montserrat Bold";
        font-size: 3rem;
        padding: 1rem;
        border: none;
        color: rgba(255, 255, 255, 0.8);
        background-color: rgba(13, 19, 33, 0.5);
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        transition: all 0.3s ease;
        &:hover {
          background-color: rgba(13, 19, 33, 1);
          color: rgba(255, 255, 255, 1);
          transform: scale(1.1);
          cursor: pointer;
        }
      }
    }
  }

  // .modal__footer

  &__footer {
  }
}
</style>