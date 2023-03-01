<template>
  <footer class="footer">
    <span>written by {{ author }}</span>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      author: 'Mr.Sun'
    }
  }
}
</script>

<style lang="stylus">
.footer {
  margin-top 40px
  text-align center
  font-size 10px
  color #bfbfbf
  text-shadow 0 1px 0 #999
}
</style>
