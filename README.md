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
