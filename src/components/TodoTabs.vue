<template>
  <div class="todo-tabs">
    <span class="left">
      {{ uncompletedTodoLen }} items left
    </span>
    <span class="tabs">
      <span
        v-for="state in states"
        :key="state"
        :class="[state, { 'actived': state === tab }]"
        @click="switchTab(state)"
      >
        {{ state }}
      </span>
    </span>
    <span
      class="clear"
      @click="clearAllCompleted"
    >
      ClearAllCompleted
    </span>
  </div>
</template>

<script>
export default {
  name: 'TodoTabs',
  props: {
    uncompletedTodoLen: {
      type: Number,
      default: 0
    },
    tab: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      states: ['all', 'active', 'completed']
    }
  },
  methods: {
    switchTab(tab) {
      this.$emit('switchTab', tab)
    },
    clearAllCompleted() {
      this.$emit('clearAllCompleted')
    },
  }
}
</script>

<style lang="stylus">
.todo-tabs {
  font-weight 100
  display flex
  justify-content space-between
  padding 5px 0
  line-height 30px
  background-color #fff
  font-size 14px
  font-smoothing antialiased
}
.left, .clear, .tabs {
  padding 0 10px
  box-sizing border-box
}
.left, .clear  {
  width 150px
}
.left {
  text-align left
}
.clear {
  text-align right
  cursor pointer
}
.tabs {
  width 200px
  display flex
  justify-content space-around
  * {
    display inline-block
    padding 0 10px
    cursor pointer
    border 1px solid rgba(175,47,47,0)
    &.actived {
      border-color rgba(175,47,47,.4)
      border-radius 5px
    }
  }
}
</style>