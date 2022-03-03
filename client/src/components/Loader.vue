<template>
  <div class="container-loader">
    <div class="loader"><span></span></div>
  </div>
</template>
<script>
export default {
  setup() {
  }
}
</script>
<style lang='scss' scoped>
.container-loader {
  position: fixed;
  top: 30%;
  left: 50%;
  transform:translateX(-50%);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
}
.loader {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(16, 38, 38, 0.2);
  animation: animate 2s linear infinite;
  -webkit-box-reflect: below 1px linear-gradient(#0001, #0004);
}

@keyframes animate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loader:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(to top, transparent, rgba(0, 255, 249, 0.4));
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
}
.loader::after {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 10%;
  height: 10%;
  background-color: #00fff9;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 0 10px #00fff9, 0 0 20px #00fff9, 0 0 30px #00fff9,
    0 0 40px #00fff9, 0 0 50px #00fff9, 0 0 60px #00fff9, 0 0 70px #00fff9,
    0 0 80px #00fff9, 0 0 90px #00fff9, 0 0 100px #00fff9;
}
span {
  position: absolute;
  top: 10%;
  left: 10%;
  right: 10%;
  bottom: 10%;
  background-color: rgba(16, 38, 38, 1);
  border-radius: 50%;
}
</style>