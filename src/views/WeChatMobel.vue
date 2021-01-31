<template>
  <div id="home">
    <el-container style="border: 1px solid #eee" :style="{ height: height }">
      <el-container>
        <img src="" alt="">
        <el-header style="text-align: center; font-size: 16px; width: 100%;">
          AlanChat
        </el-header>

        <el-main id="chatFrame" :style="{ height: height }" />
        <el-input
          v-model="value"
          placeholder="请输入内容"
          @keydown.enter.native="send"
        />
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      data: '',
      value: '',
      height: null
    }
  },
  created() {
    this.init()
    // this.height =
    //   (document.documentElement.clientHeight - 50).toString() + "px";
    localStorage.setItem('zs', 'name')
    // this.getSession();
  },
  methods: {
    // getSession: function() {
    //   this.$axios({
    //     method: "get",
    //     url: "/getSession"
    //   })
    //     .then(response => {
    //       console.log(response, "success"); // 成功的返回
    //     })
    //     .catch(error => console.log(error, "error")); // 失败的返回
    // },
    send: function() {
      var a = document.createElement('div')
      a.innerHTML = this.value
      a.className = 'content'
      a.style.paddingLeft = '40%'
      a.style.maxWidth = '100%'
      a.style.textAlign = 'right'
      document.getElementById('chatFrame').appendChild(a)
      this.$socket.emit('send', this.value)
      this.value = ''

      // var keyCode = event.keyCode || event.which;
      // if (keyCode == "13") {
      //   console.log("enter!");
      //   event.preventDefault();
      // }
    },
    init: function() {
      this.height =
        (document.documentElement.clientHeight - 200).toString() + 'px'
      setInterval(() => {
        var presentHeight =
          (document.documentElement.clientHeight - 50).toString() + 'px'
        if (presentHeight !== this.height) {
          this.height = presentHeight
        }
      }, 100)
    }
  },
  sockets: {
    // 查看socket是否渲染成功
    connect() {
      console.log('socket链接成功')
    },
    disconnect() {
      console.log('socket断开链接')
    }, // 检测socket断开链接
    reconnect() {
      console.log('socket重新链接')
    },
    // 客户端接收后台传输的socket事件
    message(data) {
      var a = document.createElement('div')
      a.innerHTML = data
      a.style.paddingRight = '40%'
      document.getElementById('chatFrame').appendChild(a)
      this.data = data // 接收的消息
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.nav .information .chunk .content {
  width: 100%;
  height: auto;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
</style>
