<template>
  <div id="home">
    <el-container
      style="border: 1px solid #eee;"
      :style="{ height: height }"
      class="alan-container"
    >
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)" />

      <el-container>
        <el-header style="text-align: right; font-size: 16px;">
          AlanChat
        </el-header>

        <el-main id="chatFrame" />
        <el-input
          v-model="value"
          placeholder="请输入内容"
          @keydown.enter.native="send"
        />
        <!-- <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="value"
          @keydown.enter="send"
        >
        </el-input> -->
      </el-container>
    </el-container>
    <!-- <input v-model="value" type="text" />
    <button @click="click">提交</button> -->
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
      height: '700px'
    }
  },
  created() {
    this.height =
      (document.documentElement.clientHeight - 80).toString() + 'px'
  },
  methods: {
    getSession: function() {
      this.$axios({
        method: 'get',
        url: '/getSession'
      })
        .then(response => {
          console.log(response, 'success') // 成功的返回
        })
        .catch(error => console.log(error, 'error')) // 失败的返回
    },
    send: function() {
      console.log('eeee')
      var a = document.createElement('div')
      a.innerHTML = this.value
      a.className = 'content'
      a.style.paddingLeft = '40%'
      a.style.maxWidth = '100%'
      a.style.textAlign = 'right'
      document.getElementById('chatFrame').appendChild(a)
      console.log(a.style.width.toString())
      this.$socket.emit('send', this.value)
      this.value = ''

      // var keyCode = event.keyCode || event.which;
      // if (keyCode == "13") {
      //   console.log("enter!");
      //   event.preventDefault();
      // }
    }
  },
  sockets: {
    // 查看socket是否渲染成功
    connect() {
      console.log('链接成功')
    },
    disconnect() {
      console.log('断开链接')
    }, // 检测socket断开链接
    reconnect() {
      console.log('重新链接')
    },
    // 客户端接收后台传输的socket事件
    message(data) {
      var a = document.createElement('div')
      a.innerHTML = data
      a.style.paddingRight = '40%'
      document.getElementById('chatFrame').appendChild(a)
      console.log('data', data)
      this.data = data // 接收的消息
    }
  }
}
</script>

<style scoped>
.alan-container {
  position: relative;
  top: 40px;
}
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
