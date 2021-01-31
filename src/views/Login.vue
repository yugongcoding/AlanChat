<template>
  <div class="home">
    <div class="main">
      <div class="title">AlanChat</div>

      <div class="mail-head-name">
        <i class="fa fa-envelope-o">邮箱</i>
        <span style="color: red">*</span>
      </div>

      <div class="mail">
        <el-input v-model="mail" placeholder="请输入您的邮箱" clearable />
      </div>

      <div class="password-head-name">
        <i class="el-icon-unlock">密码</i>
        <span style="color: red">*</span>
      </div>

      <div class="password">
        <el-input v-model="password" placeholder="请输入您的密码" show-password />
      </div>

      <div class="verification-code">
        <i class="el-icon-unlock">验证码</i>
        <span style="color: red">*</span>
      </div>

      <div class="mail-code">
        <el-input v-model="code" class="mail-code-button" placeholder="请输入验证码" />
        <el-button class="mail-code-input" type="primary" :disabled="closeButton" @click="getMailCode">{{ value }}</el-button>
      </div>

      <div class="login">
        <el-button class="login-button" type="primary" @click="login">立即登录</el-button>
      </div>

      <div class="other-login">其它登录</div>

      <div class="alan-fast-login">
        <div>
          <a href="" class="alan-other-login"><img src="http://www.skj.kim/wp-content/plugins/wechat-social-login/assets/svg/qq-icon.svg" alt=""></a>
          <a href="" class="alan-other-login"><img src="http://www.skj.kim/wp-content/plugins/wechat-social-login/assets/svg/weixin-icon.svg" alt=""></a>
          <a href="" class="alan-other-login"><svg
            height="32"
            class="octicon octicon-mark-github text-white"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            /></svg></a>
        </div>
      </div>

      <div class="alan-register-forget-password">
        <div class="alan-go-register">
          <router-link to="register">前往注册</router-link>
        </div>
        <div class="split">|</div>
        <div class="alan-forget-password">
          <router-link to="/register">忘记密码?</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Home',
  components: {},
  computed: {
    ...mapGetters([
      'selectedChat',
      'messages'
    ]),
    ...mapState([
      'user',
      'emojis'
    ])
  },
  data() {
    return {
      secondPassword: null,
      closeButton: false,
      value: '点击获取',
      mail: '',
      password: '',
      loginUrl: '/login',
      getMailCodeUrl: '/getMailCode',
      active: null,
      isactive: null,
      width: null,
      left: null,
      code: null,
      widthCode: null,
      mailCode: null,
      timer: null
    }
  },
  created() {
  },
  methods: {
    getMailCode: function() {
      this.$message({
        message: '验证码已发送至您的邮箱，有效期限一分钟，请及时查看！',
        type: 'success'
      })
      var that = this
      that.closeButton = true
      var i = 2
      that.value = '59秒后重新获取'
      that.timer = setInterval(() => {
        if (i < 60) {
          that.value = (60 - i).toString() + '秒后重新获取'
          i += 1
        } else {
          this.mailCode = null
          this.code = null
          that.value = '点击重新获取'
          that.closeButton = false
          window.clearInterval(that.timer)
        }
      }, 1000)
      this.$axios
        .post(this.getMailCodeUrl, { mail: this.mail })
        .then(response => {
          this.mailCode = response.data
        })
    },
    login: function() {
      if (
        this.mailCode !== this.code ||
        this.code === null ||
        this.code === ''
      ) {
        this.$message({
          message: '请输入正确的验证码！',
          type: 'error'
        })
      } else if (this.mail === '' || this.mail === null) {
        this.$message({
          message: '邮箱不能为空！',
          type: 'error'
        })
      } else if (this.password.length < 6) {
        this.$message({
          message: '密码长度应大于六位数！',
          type: 'error'
        })
      } else {
        this.$axios
          .post(this.loginUrl, { mail: this.mail, password: this.password })
          .then(response => {
            console.log(response.data)
            if (response.data[0] === true) {
              this.$store.dispatch('selectCurrentUser', response.data[1], response.data[2])
              this.$message({
                message: '您已登录成功！',
                type: 'success'
              })
              if (
                /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(
                  navigator.userAgent
                )
              ) {
                this.$router.replace('/wechat-mobel')
              } else {
                this.$router.replace('/chat')
                this.$socket.emit('set_room', response.data[3])
              }
            } else {
              this.$message({
                message: '账号或密码不正确，请重新检查后再次登录！',
                type: 'error'
              })
            }
          })
      }
    }
  }
}
</script>

<style scoped>
.home {
  position: absolute;
  width: 100%;
  height: 100%;
}
.main {
  right: 40%;
  width: 20%;
  height: 60%;
  position: relative;
  left: 40%;
  top: 20%;
  bottom: 20%;
}
.title {
  height: 10%;
  left: 30%;
  width: 40%;
  text-align: center;
  font-size: 1.5rem;
  /* padding: 10px; */
  position: relative;
}
.mail-head-name {
  width: 90%;
  padding: 5px;
  left: 4%;
  position: relative;
}
.mail {
  width: 90%;
  padding: 5px;
  left: 4%;
  /* right: 0%; */
  position: relative;
}
.verification-code {
  width: 90%;
  padding: 5px;
  left: 4%;
  position: relative;
}
.alan-go-register {
  display: inline-block;
  width: 49%;
  text-align: center;
  padding-top: 5px;
  font-size: 14px;
}
.alan-forget-password {
  padding-top: 5px;
  display: inline-block;
  text-align: center;
  width: 49%;
  font-size: 14px;
}
.alan-register-forget-password {
  top: 20%;
  width: 90%;
  padding: 5px;
  left: 4%;
  position: relative;
}
.split {
  padding-top: 5px;
  display: inline-block;
  text-align: center;
  width: 2%;
}
.alan-other-login {
  width: 90%;
  padding: 5px;
  left: 4%;
  position: relative;
}
.alan-fast-login {
  width: 90%;
  padding-top: 5px;
}
.mail-code {
  width: 90%;
  padding: 5px;
  left: 4%;
  position: relative;
}
.mail-code-input {
  width: 50%;
}
.mail-code-button {
  width: 50%;
}
.password {
  width: 90%;
  padding: 5px;
  left: 4%;
  position: relative;
}
.login-button {
  width: 100%;
  padding-top: 15px;
}
.login {
  width: 90%;
  padding: 5px;
  left: 4%;
  position: relative;
}
.other-login {
  width: 90%;
  padding: 5px;
  left: 4%;
  position: relative;
}
.password-head-name {
  width: 90%;
  padding: 5px;
  left: 4%;
  position: relative;
}
</style>
