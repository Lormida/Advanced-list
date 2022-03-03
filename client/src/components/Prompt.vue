<template>
  <div class="prompt" :class="getClassStatus">
    <!-- <h2 class="prompt__header">{{ statusCode }}</h2> -->
    <h2 class="prompt__text">{{ message }}</h2>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {

  props: ['statusCode', 'message'],
  setup(props) {
    const getClassStatus = computed(() => {
      let status = null
      let statusCode = props.statusCode
      if (String(statusCode).startsWith('2')) {
        status = 'success'
      } else {
        status = 'error'
      }
      return status
    })

    return { getClassStatus }
  }
}
</script>
<style lang='scss' scoped>
.prompt {
  position: fixed;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
  height: auto;
  width: 35%;
  padding: 1rem 2rem;
  border: 2px solid #fff;
  border-radius: 1px;
  font-size: 2rem;
  font-family: "Montserrat Regular";
  text-align: center;
  // .prompt__header

  &__header {
  }

  // .prompt__text

  &__text {
  }
}
.error {
  background-color: rgb(221, 97, 97);
}
.success {
  background-color: rgba(102, 189, 109, 1);
}
</style>