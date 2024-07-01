import 'assets/style/footer.styl'

export default {
  data() {
    return {
      author: 'Mr.Sun'
    }
  },

  render(h) {
    return (
      <footer class="footer">
        <p>written by { this.author }(jsx)</p>
        <div class="avatar">
          <img src={require("assets/img/avatar.png")} alt="" />
          {/* <img src="~assets/img/avatar.png" alt="" /> */}

          {/* <!-- error -->
          <!-- <img src="assets/img/avatar.png" alt=""> -->
          <!-- <img src="#/img/avatar.png" alt=""> -->
          <!-- <img src="~#/img/avatar.png" alt=""> --> */}
        </div>
      </footer>
    )
  }
}
