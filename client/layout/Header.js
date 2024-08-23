import { h } from 'vue'
import '#/style/header.styl'

export default {
  name: 'Header',
  beforeCreate() {
    console.log('head beforeCreate...')
  },
  created() {
    console.log('head created...')
  },
  beforeMount() {
    console.log('head beforeMounted...')
  },
  mounted() {
    console.log('head mounted...')
  },
  beforeUpdate() {
    console.log('head beforeUpdate...')
  },
  update() {
    console.log('head update...')
  },
  beforeDestroy() {
    console.log('head beforeDestory...')
  },
  destroyed() {
    console.log('head destroyed...')
  },
  render() {
    return h(
      'header',
      { class: 'header' },
      [
        h(
          'h1',
          { style:
            { 'font-family': 'daoliti' }
          },
          ['Todo List']
        )
      ]
    )
  }
}
