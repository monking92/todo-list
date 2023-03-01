import '#/style/header.styl'

export default {
  name: 'Header',
  beforeCreate() {
    console.log('head beforeCreate...')
    debugger
  },
  created() {
    console.log('head created...')
    debugger
  },
  beforeMount() {
    console.log('head beforeMounted...')
    debugger
  },
  mounted() {
    console.log('head mounted...')
    debugger
  },
  beforeUpdate() {
    console.log('head beforeUpdate...')
    debugger
  },
  update() {
    console.log('head update...')
    debugger
  },
  beforeDestroy() {
    console.log('head beforeDestory...')
    debugger
  },
  destroyed() {
    console.log('head destroyed...')
    debugger
  },
  render(h) {
    return h(
      'header',
      { class: 'header' },
      [
        h(
          'h1',
          ['Todo List']
        )
      ]
    )
  }
}
