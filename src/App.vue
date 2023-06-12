<template>
  <div class="app">
    <div class="cover"></div>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.js'
import Todo from './components/Todo.vue'
import Footer from './components/Footer'

export default {
  components: {
    Header,
    Todo,
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
</style>
