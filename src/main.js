import Vue from 'vue'
import App from './App.vue'

// import './assets/style/base.styl'
import '#/style/base.styl'

new Vue({
  el: '#app',
  beforeCreate() {
    console.log('root beforeCreate...')
  },
  created() {
    console.log('root created...')
  },
  beforeMount() {
    console.log('root beforeMounted...')
  },
  mounted() {
    console.log('root mounted...')
  },
  beforeUpdate() {
    console.log('root beforeUpdate...')
  },
  update() {
    console.log('root update...')
  },
  beforeDestroy() {
    console.log('root beforeDestory...')
  },
  destroyed() {
    console.log('root destroyed...')
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
    return h(App)
  }
})
