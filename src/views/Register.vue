<template>
  <div class="home">
    <div class="main">
      <div class="title">AlanChat</div>
      <!-- 邮箱 -->
      <div class="mail-head-name">
        <i class="fa fa-envelope-o">邮箱</i>
        <span style="color: red">*</span>
      </div>

      <div class="mail">
        <el-input v-model="mail" placeholder="请输入您的邮箱" clearable />
      </div>
      <!-- 输入密码 -->
      <div class="password-head-name">
        <i class="el-icon-unlock">密码</i>
        <span style="color: red">*</span>
      </div>

      <div class="password">
        <el-input v-model="password" placeholder="请输入您的密码" show-password />
      </div>
      <!-- 确认密码 -->
      <div class="password-head-name">
        <i class="el-icon-unlock">确认密码</i>
        <span style="color: red">*</span>
      </div>

      <div class="password">
        <el-input v-model="password" placeholder="请输入您的密码" show-password />
      </div>
      <!-- 获取验证码 -->
      <div class="verification-code">
        <i class="el-icon-unlock">验证码</i>
        <span style="color: red">*</span>
      </div>

      <div class="mail-code">
        <el-input v-model="code" class="mail-code-button" placeholder="请输入验证码" />
        <el-button class="mail-code-input" type="primary" :disabled="closeButton" @click="getMailCode">{{ value }}</el-button>
      </div>

      <div class="register">
        <el-button class="register-button" type="primary" @click="register">立即注册</el-button>
      </div>

      <div class="go-to-login">
        <router-link to="/login">已有账号？前往登录>></router-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      secondPassword: null,
      closeButton: false,
      value: '点击获取',
      mail: '',
      password: '',
      registerUrl: '/register',
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
          that.mailCode = null
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
          console.log(this.mailCode)
        })
    },
    register: function() {
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
      } else if (this.password !== this.secondPassword) {
        this.$message({
          message: '两次输入密码不一致，请确认您输入的密码是否正确！',
          type: 'error'
        })
      } else {
        this.$axios
          .post(this.registerUrl, { mail: this.mail, password: this.password })
          .then(response => {
            if (response.data === true) {
              this.$message({
                message: '您已登录成功！',
                type: 'success'
              })
              if (
                /Android|webOS|iPhone|iPod|BlackBerry/i.test(
                  navigator.userAgent
                )
              ) {
                this.$router.replace('/wechat-mobel')
              } else {
                this.$router.replace('/wechat')
              }
            } else {
              this.$message({
                message: '您的账号已经注册，可直接登录！',
                type: 'warning'
              })
            }
          })
      }
    }
  }
}
</script>

<style scoped>
.go-to-login {
  width: 100%;
  padding-top: 5px;
  position: relative;
  text-align: right;
}
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
.register-button {
  width: 100%;
  padding-top: 15px;
}
.register {
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
