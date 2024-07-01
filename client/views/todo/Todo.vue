<template>
  <div class="todo">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      @keyup.enter="addTodo"
    >
    <div class="todo-item-wrap">
      <TodoItem
        v-for="todo of tabTodos"
        :key="todo.id"
        :todo="todo"
        @delete="deleteTodo"
      />
    </div>
    <TodoTabs
      :tab="tab"
      :uncompletedTodoLen="uncompletedTodoLen"
      @switchTab="switchTab"
      @clearAllCompleted="clearAllCompleted"
    />
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue'
import TodoTabs from './TodoTabs.vue'

let id = 0
export default {
  name: 'Todo',
  components: {
    TodoItem,
    TodoTabs
  },
  beforeCreate() {
    console.log('todo beforeCreate...')
  },
  created() {
    console.log('todo created...')
  },
  beforeMount() {
    console.log('todo beforeMounted...')
  },
  mounted() {
    console.log('todo mounted...')
  },
  beforeUpdate() {
    console.log('todo beforeUpdate...')
  },
  update() {
    console.log('todo update...')
  },
  beforeDestroy() {
    console.log('todo beforeDestory...')
  },
  destroyed() {
    console.log('todo destroyed...')
  },
  data() {
    return {
      todos: [],
      tab: 'all'
    }
  },
  computed: {
    tabTodos() {
      if (this.tab === 'all') {
        return this.todos
      }
      return this.todos.filter(todo => todo.completed === (this.tab === 'completed'))
    },
    uncompletedTodoLen() {
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  methods: {
    addTodo(e) {
      if (e.target.value.trim()) {
        this.todos.push({
          id: id++,
          content: e.target.value,
          completed: false
        })

        e.target.value = ''
      }
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.findIndex(t => t.id === id), 1)
    },
    switchTab(tab) {
      this.tab = tab
    },
    clearAllCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus">
.todo {
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
  .add-input {
    position relative
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit
    line-height 1.4em
    border 0
    outline none
    color inherit
    padding 6px
    border 1px solid #999
    box-shadow inset 0 -1px 5px 0 rgba(0,0,0,.2)
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 60px
    border none
    box-shadow inset 0 -2px 1px rgba(0,0,0,.03)
  }
  &-item-wrap {
    max-height 600px
    overflow-y auto
  }
}
</style>
