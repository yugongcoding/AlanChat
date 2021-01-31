<template>
  <div class="home">
    <div class="title">@ AlanChat</div>
    <div
      :class="{ headname: active, headnameMobel: isactive }"
      :style="{ width: width, left: left }"
    >
      <i class="fa fa-envelope-o" style="font-size:15px" />
      邮箱<span style="color: red">*</span>
    </div>
    <div
      :class="{ name: active, nameMobel: isactive }"
      :style="{ width: width, left: left }"
    >
      <el-input v-model="mail" placeholder="请输入您的邮箱" clearable />
    </div>
    <div
      :class="{ headpassword: active, headpasswordMobel: isactive }"
      :style="{ width: width, left: left }"
    >
      <i class="el-icon-unlock" />
      密码<span style="color: red">*</span>
    </div>
    <div
      :class="{ password: active, passwordMobel: isactive }"
      :style="{ width: width, left: left }"
    >
      <el-input
        v-model="password"
        placeholder="请输入您的密码"
        show-password
      />
    </div>
    <div
      :class="{ code: active, codeMobel: isactive }"
      :style="{ width: width, left: left }"
    >
      <el-button
        type="primary"
        :style="{ width: widthCode }"
        :disabled="closeButton"
        @click="getMailCode"
      >{{ value }}</el-button>
      <el-input
        v-model="code"
        placeholder="请输入验证码"
        style="float:left;"
        :style="{ width: widthCode }"
      />
    </div>
    <div
      :class="{ register: active, registerMobel: isactive }"
      :style="{ width: width, left: left }"
    >
      <el-button
        type="primary"
        :style="{ width: width }"
        @click="login"
      >立即登录</el-button>
    </div>
    <div class="alan-fast-login" :style="{ width: width, left: left }">
      <div style="padding-bottom: 5px">其它登录</div>
      <div>
        <a
          href=""
          class="alan-other-login"
        ><img
          src="http://www.skj.kim/wp-content/plugins/wechat-social-login/assets/svg/qq-icon.svg"
          alt=""
        ></a>
        <a
          href=""
          class="alan-other-login"
        ><img
          src="http://www.skj.kim/wp-content/plugins/wechat-social-login/assets/svg/weixin-icon.svg"
          alt=""
        ></a>
        <a
          href=""
          class="alan-other-login"
        ><svg
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

    <div
      class="alan-register-forget-password"
      :style="{ width: width, left: left }"
    >
      <a
        href="/register"
        class="alan-go-register"
      ><span>前往注册</span></a>
      |
      <a href="" class="alan-forget-password"><span>忘记密码?</span></a>
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
    this.judgePlatform()
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
    },
    judgePlatform: function() {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        // 移动端操作
        var clientWidth = document.documentElement.clientWidth
        this.width = (clientWidth * 0.7).toString() + 'px'
        this.widthCode = ((clientWidth * 0.7) / 2).toString() + 'px'
        this.left = '15%'
        this.isactive = true
      } else {
        // PC端操作
        this.width = '300px'
        this.active = true
        this.widthCode = '150px'
      }
    }
  }
}
</script>

<style scoped>
.alan-go-register {
  padding-right: 40px;
  text-decoration: none;
  color: black;
}
.alan-forget-password {
  padding-left: 40px;
  text-decoration: none;
  color: black;
}
.alan-register-forget-password {
  text-align: center;
  font-size: 0.7rem;
  padding-top: 15px;
  padding-left: 5px;
  width: 300px;
  position: relative;
  top: 150px;
  left: 41%;
}
.alan-other-login {
  padding-right: 5px;
}
.alan-fast-login {
  padding-top: 15px;
  padding-left: 5px;
  width: 300px;
  position: relative;
  top: 100px;
  left: 41%;
}
.home {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  /* background-color: #eee; */
}
.code {
  padding-top: 10px;
  padding-left: 5px;
  left: 41%;
  width: 300px;
  position: relative;
  top: 100px;
}
.codeMobel {
  padding-top: 10px;
  padding-left: 5px;
  /* width: 300px; */
  position: relative;
  top: 100px;
}
.title {
  padding: 20px;
  text-align: center;
  font-size: 2rem;
  position: relative;
  top: 100px;
}
.name {
  padding: 5px;
  left: 41%;
  width: 300px;
  position: relative;
  top: 100px;
}
.password {
  padding: 5px;
  width: 300px;
  position: relative;
  top: 100px;
  left: 41%;
}
.register {
  padding-top: 15px;
  padding-left: 5px;
  width: 300px;
  position: relative;
  top: 100px;
  left: 41%;
}
.headname {
  padding: 5px;
  padding-bottom: 0;
  /* text-align: center; */
  left: 41%;
  width: 300px;
  position: relative;
  top: 100px;
}
.headpassword {
  padding: 5px;
  padding-bottom: 0;
  left: 41%;
  width: 300px;
  position: relative;
  top: 100px;
}

.nameMobel {
  padding: 5px;

  /* left: 41%; */
  /* width: 300px; */
  position: relative;
  top: 100px;
}
.passwordMobel {
  padding: 5px;
  /* width: 300px; */
  position: relative;
  top: 100px;
  /* left: 41%; */
}
.registerMobel {
  padding-top: 15px;
  padding-left: 5px;
  /* width: 300px; */
  position: relative;
  top: 100px;
  /* left: 41%; */
}
.headnameMobel {
  padding: 5px;
  padding-bottom: 0;
  /* left: 41%; */
  /* width: 300px; */
  position: relative;
  top: 100px;
}
.headpasswordMobel {
  padding: 5px;
  padding-bottom: 0;

  /* left: 41%; */
  /* width: 300px; */
  position: relative;
  top: 100px;
}
</style>
