<template>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in" appear>
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
<script>
export default {
  setup() {
  }
}
</script>

<style lang="scss">
html {
  font-size: 62.5%;
}
body {
  background: linear-gradient(to right, #3b4371, #f3904f);
}
* {
  font-family: "Montserrat Regular";
  user-select: none;
}
.container {
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
  min-height: 100vh;
}

@font-face {
  font-family: "Montserrat Regular";
  font-style: normal;
  font-weight: normal;
  src: url("./assets/fonts/Montserrat-Regular.woff") format("woff");
}

@font-face {
  font-family: "Montserrat Thin";
  font-style: normal;
  font-weight: normal;
  src: url("./assets/fonts/Montserrat-Thin.woff") format("woff");
}

@font-face {
  font-family: "Montserrat Bold";
  font-style: normal;
  font-weight: normal;
  src: url("./assets/fonts/Montserrat-Bold.woff") format("woff");
}

.route-enter-to,
.router-leave-from {
  opacity: 1;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}
.route-enter-active,
.route-leave-active {
  transition: all 0.5s ease 0s;
}
</style>