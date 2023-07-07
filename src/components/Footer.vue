<template>
  <footer class="footer">
    <p>written by {{ author }}</p>
    <div class="avatar">
      <!-- <img :src="require('../assets/img/avatar.png')" alt=""> -->
      <!-- <img :src="require('#/img/avatar.png')" alt=""> -->
      <img src="@/assets/img/avatar.png" alt="">
      <img src="~assets/img/avatar.png" alt="">

      <!-- error -->
      <!-- <img src="assets/img/avatar.png" alt=""> -->
      <!-- <img src="#/img/avatar.png" alt=""> -->
      <!-- <img src="~#/img/avatar.png" alt=""> -->
    </div>
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
  P {
    font-size: 14px
    font-family "daoliti" !important;
  }
  .avatar {
    img {
      width: 45px
      height: 45px
      border-radius 50%
    }
  }
}
</style>
