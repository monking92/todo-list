# Todo List

# 工程配置
- `resolve.alias` 配置别名
  - `@` 别名可在`<template> <script> <style>`直接使用
  - `assets` 等别名在`<template> <style>`内使用前需加 `~`（loader会将其作为模块解析）
  - `#` 作为别名在`<template> <style>`中无效 仍需将图片等资源作为模块导入


## 1.组件化
### 1.1 异步组件
三种异步组件：
1. 普通函数异步组件
```javascript
Vue.component('async-example', function(resolve, reject) {
  // require(dependencies: String[], [callback: function(...)])
  // webpack module方法
  // 类似`require.ensure` 将拆分给定的依赖到不同的bundle中，用以异步加载
  // `callback`将通过dependencies数组中的每个依赖项的导出进行调用
  require(['./my-async-component'], resolve)
})
```

2. `Promise` 异步组件
```javascript
// `import` 返回一个 `Promise` 对象
Vue.component('async-promise', () => import('./my-async-component'))
```

3. 高级异步组件
```javascript
Vue.component('async-higher', () => ({
  // 要加载的组件（应该是个Promise）
  component: import('./MyComp'),
  // 当异步组件在加载时使用的组件
  loading: LoadingComponent,
  // 加载失败使用的组件
  error: ErrorComponent,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,
  // The error component will be displayed if a timeout is provided and exceeded. Default: Infinity.
  timeout: 3000
}))
```

# 2.响应式原理
1. `Object.defineProperty`定义响应式对象(getter setter)



# vue 升级
## vue 3.x

## vue-router v4.x

### vue-router 插件职责
1. 全局注册 `RouterView` 和 `RouterLink`组件
2. 添加全局 `$router` 和 `$route` 属性
3. 启用`useRouter()` 和 `useRoute()` 组合式函数
4. 触发路由器解析初始路由

### 完整的导航解析流程
1. 导航被触发
2. 在失活的组件里调用 `beforeRouteLeave`守卫
3. 调用全局的 `beforeEach`
4. 在重用的组件里调用 `beforeRouteUpdate` (2.2+)
5. 在路由配置里调用 `beforeEnter`
6. 解析异步路由组件
7. 在被激活的组件里调用 `beforeRouteEnter`
8. 调用全局的 `beforeResolve` (2.5+)
9. 导航被确认
10. 调用全局的 `afterEach`
11. 触发DOM更新
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入

### [改动](https://router.vuejs.org/zh/guide/migration/)
#### 1. `createRouter`
- v3
```javascript
// @/router/index.js
// 避免服务器端渲染内存溢出
import Router from 'vue-router'
export default () => {
  return new Router({

  })
}
```

- v4
```javascript
// @/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory()

})
```

#### 2. `app.use(router)`
```javascript
import { createApp } from 'vue'
import router from '@/router/index'

const app = createApp({})

app.use(router)
```

#### 3. `<router-view />`
- v3
```tpl
<transition name="fade">
  <router-view />
</transition>
```

- v4
```tpl
<router-view v-slot="{ Component }">
  <transition name="fade">
    <Component :is="Component" />
  </transition>
</router-view>
```


## pinia
### 对比vuex
- 弃用 `mutation`
- 无需动态添加 `Store`，默认都是动态的
- 不再有嵌套结构的模块
- 不再有可命名的模块

### store
#### `storeToRefs()` 从 Store 解构
```javascript
import { storeToRefs } from 'pinia'

const store = useCounterStore()
// 破坏了响应性
// const { name, doubleCount } = store

const { name, doubleCount } = storeToRefs(store)
// 作为 action 的 increment 可以直接解构
const { increment } = store
```

### state
#### 重置`state` `$reset()`
- 选项式API
`$reset()` 内部，会调用 `state()` 函数来创建一个新的状态对象，并用它替换当前状态
```javascript
const store = useStore();
store.$reset();
```

- 组合式API
```javascript
const useCounterStore = defineStore('counter', () => {
  const count = ref(0);

  function $reset() {
    count.value = 0;
  }

  return { count, $reset };
});
```

#### 修改`state`
##### `mapWritableState()`
`mapWritableState()` 不能像 `mapState()` 一样传递一个函数
```javascript
import { mapWritableState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  computed: {
    // 可以访问组件中的 `this.count` 并允许设置它
    // this.count++
    // 与从 store.count 中读取的数据相同
    ...mapWritableState(useCounterStore, ['count']),
    // 与上述相同，但将其注册为 this.myOwnName
    ...mapWritableState(useCounterStore, {
      myOwnName: 'count'
    })
  }
}
```

##### `$patch()`
- 可同时更改多个属性
```javascript
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO'
});
```

- 接受函数
```javascript
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 }),
  state.hasChanged = true
});
```

#### 订阅`state` `$subscrible()`
`$subscrible()` 相比 `watch()` 在patch后只触发一次
```javascript
cartStore.$subscrible((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // 和 cartStore.$id 一样
  mutation.storeId // 'cart'
  // 只有 mutation.type === 'patch object' 的情况下才可用
  mutation.payload // 传递给 cartStore.$patch()的补丁对象
}, {
  // 在组件卸载之后仍会保留
  detached: true
});
```

### action
#### `mapActions`
```javascript
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  methods: {
    // 访问组件内的 this.increment()
    // 与从 store.increment() 调用相同
    ...mapActions(useCounterStore, ['increment'])
    ...mapActions(useCounterStore, { myOwnName: 'increment' })
  }
}
```

#### [订阅action `store.$onAction`](https://pinia.vuejs.org/zh/core-concepts/actions.html#subscribing-to-actions)


### [插件](https://pinia.vuejs.org/zh/core-concepts/plugins.html)
