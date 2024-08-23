import { createApp, h } from 'vue'
import App from './App.vue'
import router from '@/router/index'

// import './assets/style/base.styl'
import '#/style/base.styl'

// test babel
const fn = (...params) => {
  console.log(params)
}
const promise = new Promise((() => {}, () => {}))
const set = new Set()
let map = new Map()
let arr = [4, 2, 6]
fn(arr)

console.log(promise)
console.log(set)
console.log(map)

const app = createApp({
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
  data: () => ({
    a: 1,
    b: 2
  }),
  methods: {
    logA() {
      console.log('logA: ', this.a)
    }
  },
  render: () => {
    return h(App)
  }
})

app.use(router)
app.mount('#app')
