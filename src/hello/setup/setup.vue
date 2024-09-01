<template>
  <h1 class="hello-setup-title">{{ title }}</h1>
  <p>{{ description }}</p>

  <Child name="setup()" />
</template>

<script>
import { ref } from 'vue'
import Child from './child.vue'

export default {
  components: {
    Child
  },

  setup() {
    const title = 'hello setup'
    const description = ref('this is introduce setup()')

    return {
      title,
      description
    }
  }
}
</script>
