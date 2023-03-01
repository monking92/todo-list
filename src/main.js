import Vue from 'vue'
import App from './App.vue'

// import './assets/style/base.styl'
import '#/style/base.styl'

new Vue({
  el: '#app',
  beforeCreate() {
    console.log('root beforeCreate...')
    debugger
  },
  created() {
    console.log('root created...')
    debugger
  },
  beforeMount() {
    console.log('root beforeMounted...')
    debugger
  },
  mounted() {
    console.log('root mounted...')
    debugger
  },
  beforeUpdate() {
    console.log('root beforeUpdate...')
    debugger
  },
  update() {
    console.log('root update...')
    debugger
  },
  beforeDestroy() {
    console.log('root beforeDestory...')
    debugger
  },
  destroyed() {
    console.log('root destroyed...')
    debugger
  },
  data: {
    a: 1,
    b: 2
  },
  methods: {
    logA() {
      console.log('logA: ', this.a)
    }
  },
  render: (h) => {
    debugger
    return h(App)
  }
})
