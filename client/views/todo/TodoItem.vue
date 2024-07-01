<template>
  <div :class="['todo-item', { completed: todo.completed }]">
    <input
      type="checkbox"
      class="toggle"
      v-model="todo.completed"
    >
    <label>{{ todo.content }}</label>
    <button class="delete" @click="deleteTodo"></button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteTodo(id) {
      this.$emit('delete', this.todo.id)
    }
  }
}
</script>

<style lang="stylus">
.todo-item {
  position relative
  background-color #fff
  font-size 24px
  border-bottom 1px solid rgba(0,0,0,.06)
  .toggle {
    text-align: center
    width: 40px
    height: 40px
    position: absolute
    top: 0
    bottom: 0
    margin: auto 0
    border: none
    appearance: none
    outline none
    &::after{
      content url('#/img/round.svg')
    }
    &:checked::after{
      content url('#/img/done.svg')
    }
  }
  label {
    white-space pre-line
    word-break break-all
    padding 15px 60px 15px 15px
    margin-left 45px
    display block
    line-height 1.2
    transition color .4s
  }
  .delete {
    position absolute
    top 0
    right 10px
    bottom 0
    width 40px
    height 40px
    margin auto 0
    font-size 30px
    color #cc9a9a
    margin-bottom 11px
    transition: color .2s ease-out
    background-color transparent
    appearance none
    border-width 0
    cursor pointer
    outline none
  }
  &:hover {
    .delete::after {
      content: '×'
    }
  }
  &.completed {
    label {
      color #d9d9d9
      text-decoration line-through
    }
  }
}
</style>
