<template>
  <div class="app">
    <div class="cover"></div>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
    <!-- <FunnelCharts /> -->
  </div>
</template>

<script>
import Header from './components/Header.js'
import Todo from './components/Todo.vue'
import Footer from './components/Footer'
import FunnelCharts from './components/FunnelCharts'

export default {
  components: {
    Header,
    Todo,
    Footer,
    FunnelCharts
  },
  beforeCreate() {
    console.log('app beforeCreate...')
    debugger
  },
  created() {
    console.log('app created...')
    debugger
  },
  beforeMount() {
    console.log('app beforeMounted...')
    debugger
  },
  mounted() {
    console.log('app mounted...')
    debugger
  },
  beforeUpdate() {
    console.log('app beforeUpdate...')
    debugger
  },
  update() {
    console.log('app update...')
    debugger
  },
  beforeDestroy() {
    console.log('app beforeDestroy...')
    debugger
  },
  destroyed() {
    console.log('app destroyed...')
    debugger
  },
  data() {
    return {
      text: 'hello vue123 321'
    }
  }
}
</script>

<style>
.app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
}
.cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #999;
  opacity: .9;
  z-index: -1;
}
</style>
