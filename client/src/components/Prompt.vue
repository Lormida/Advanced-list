<template>
  <div class="prompt">
    <h2 class="prompt__header">{{ status }}</h2>
    <p class="prompt__text">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ['status', 'message'],
  setup() {

  }
}
</script>
<style lang='scss' scoped>
.prompt {
  position: fixed;
  top: 1%;
  left: 50%;
  transform: translateX(-50%);
  height: 100px;
  width: 30%;
  padding: 1rem 2rem;
  border: 2px solid #fff;
  border-radius: 10px;
  background-color: rgba(102, 189, 109, 1);
  font-size: 2rem;
  font-family: "Montserrat Bold";
  text-align: center;
  // .prompt__header

  &__header {
  }

  // .prompt__text

  &__text {
  }
}
</style>