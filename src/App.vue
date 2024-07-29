<template>
  <div class="app">
    <div class="cover"></div>
    <Header></Header>

    <router-link to="/index">go to index</router-link>
    <router-link to="/login">go to login</router-link>
    <router-link to="/login/exact">go to login exact</router-link>

    <!-- v-enter-from -> v-enter-active -> v-enter-to -->
    <!-- v-leave-from -> v-leave-active -> v-leave-to -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.js'
// import Footer from './components/Footer'
import Footer from './components/Footer.jsx'

export default {
  components: {
    Header,
    Footer
  },
  beforeCreate() {
    console.log('app beforeCreate...')
  },
  created() {
    console.log('app created...')
  },
  beforeMount() {
    console.log('app beforeMounted...')
  },
  mounted() {
    console.log('app mounted...')
  },
  beforeUpdate() {
    console.log('app beforeUpdate...')
  },
  update() {
    console.log('app update...')
  },
  beforeDestroy() {
    console.log('app beforeDestroy...')
  },
  destroyed() {
    console.log('app destroyed...')
  },
  data() {
    return {
      text: 'hello vue123 321'
    }
  }
}
</script>

<style lang="stylus">
.main {
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  .cover {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0
}
</style>
