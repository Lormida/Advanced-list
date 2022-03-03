<template>
  <div class="container category">
    <h1 class="category__choose">You have to choose category</h1>
    <div class="category__wrapper">
      <div class="category__item">
        <router-link class="category__link" to="/english-dictionary"
          >English</router-link
        >
      </div>
      <div class="category__item">
        <router-link class="category__link" to="/">Amazing girls</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
  }
}
</script>
<style lang='scss' scoped>
.container {
  background: linear-gradient(to right, #ff5e62, #ff9966);
}
.category {
  // .category__choose

  &__choose {
    font-size: 5rem;
    text-align: center;
    text-transform: uppercase;
    padding: 3rem 0;
  }

  // .category__wrapper

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  // .category__item

  &__item {
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 40%;
    min-height: 250px;
    height: 25vh;
    margin: 2% 0;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  // .category__link

  &__link {
    font-size: 4rem;
    border-bottom: 6px solid #fff;
    transition: all 0.3s ease;
    &:hover {
      border-bottom-color: #000;
      color: #fff;
      transform: scale(1.05);
    }
  }
}
</style>