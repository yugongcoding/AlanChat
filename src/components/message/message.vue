<!-- 消息框 -->
<template>
  <div ref="kongtiao" class="message">
    <header ref="header" class="header" @dblclick="mouseDoubleClickHandleelse" @mousedown="mouseDownHandleelse($event)" @mouseup="mouseUpHandleelse($event)">
      {{ selectedChat.user.name }}
      <!-- <div class="friendname">{{ selectedChat.user.name }}</div> -->
    </header>

    <div ref="list" class="message-wrapper">
      <ul v-if="selectedChat">
        <li v-for="item in selectedChat.messages" :key="item.id" class="message-item">
          <div class="time"><span>{{ item.date | time }}</span></div>
          <div class="main" :class="{ self: item.self }">
            <img class="avatar" width="36" height="36" :src="item.self ? user.img : selectedChat.user.img">
            <div class="content">
              <div class="text" v-html="replaceFace(item.content)" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  filters: {
    // 将日期过滤为 hour:minutes
    time(date) {
      if (typeof date === 'string') {
        date = new Date(date)
      }
      if (date.getMinutes() < 10) {
        return date.getHours() + ':0' + date.getMinutes()
      } else {
        return date.getHours() + ':' + date.getMinutes()
      }
    }
  },
  data() {
    return {
      moveDataelse: {
        x: null,
        y: null
      },
      isFullScreen: false
    }
  },
  computed: {
    ...mapGetters([
      'selectedChat',
      'messages'
    ]),
    ...mapState([
      'user',
      'emojis',
      'lastSize'
    ])
  },
  watch: {
    // 发送信息后,让信息滚动到最下面
    messages() {
      setTimeout(() => this.$refs.list.scrollTop = this.$refs.list.scrollHeight, 0)
    }
  },
  mounted() {
    // this.$socket.emit("set_room", '请给我创建房间, 谢谢！');
    //  在页面加载时让信息滚动到最下面
    setTimeout(() => this.$refs.list.scrollTop = this.$refs.list.scrollHeight, 0)
  },
  created() {
    console.log(this.$refs)
  },
  methods: {
    ...mapActions([
      'fullScreen'
    ]),
    mouseDoubleClickHandleelse(event) {
      this.isFullScreen = !this.isFullScreen
      if (this.isFullScreen === true) {
        const data = {
          top: '0%',
          left: '0%',
          width: '100%',
          height: '100%'
        }
        this.$store.dispatch('fullScreen', data)
      } else {
        const data = this.lastSize
        this.$store.dispatch('fullScreen', data)
      }
    },
    mouseDownHandleelse(event) {
      this.moveDataelse.x = this.$refs.header.offsetLeft + event.offsetX
      this.moveDataelse.y = this.$refs.header.offsetTop + event.offsetY
      window.onmousemove = this.mouseMoveHandleelse
    },
    mouseMoveHandleelse(event) {
      const moveLeft = event.pageX - this.moveDataelse.x + 'px'
      const moveTop = event.pageY - this.moveDataelse.y + 'px'
      var data = {
        top: moveTop,
        left: moveLeft
      }
      this.$store.dispatch('changePosition', data)
    },
    mouseUpHandleelse(event) {
      window.onmousemove = null
    },
    //  在发送信息之后，将输入的内容中属于表情的部分替换成emoji图片标签
    //  再经过v-html 渲染成真正的图片
    replaceFace(con) {
      if (con.includes('/:')) {
        var emojis = this.emojis
        for (var i = 0; i < emojis.length; i++) {
          var emoji_tmp = '<img src="./emoji/' + emojis[i].file + '"' + 'alt="" style="vertical-align: middle; width: 24px; height: 24px" />'.toString()
          con = con.replace(emojis[i].reg, emoji_tmp)
        }
        return con
      }
      return con
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
      //   this.selectedChat.content.push(msg)
      this.$store.dispatch('receiveMessage', data)
    }
  }
}
</script>
<style scoped lang='less'>
</style>
<style lang="stylus" scoped>
   .message
      width: 100%
      height: 100%
      .header
        height: 60px
        padding: 28px 0 0 30px
        box-sizing: border-box
        border-bottom: 1px solid #e7e7e7
        .friendname
            font-size: 18px
      .message-wrapper
        min-height: 100%
        max-height: 100%
        padding: 10px 15px
        box-sizing: border-box
        overflow-y: auto
        border-bottom: 1px solid #e7e7e7
        .message
            margin-bottom: 15px
        .time
            width: 100%
            font-size: 12px
            margin: 7px auto
            text-align: center
            span
                display: inline-block
                padding: 4px 6px
                color: #fff
                border-radius: 3px
                background-color: #dcdcdc
        .main
            .avatar
                float: left
                margin-left: 15px
                border-radius: 3px
            .content
                display: inline-block
                margin-left: 10px
                position: relative
                padding: 6px 10px
                max-width: 330px
                min-height: 36px
                line-height: 24px
                box-sizing: border-box
                font-size: 14px
                text-align: left
                word-break: break-all
                background-color: #fafafa
                border-radius: 4px
                &:before
                    content: " "
                    position: absolute
                    top: 12px
                    right: 100%
                    border: 6px solid transparent
                    border-right-color: #fafafa
        .self
            text-align: right
            .avatar
                float: right
                margin:0 15px
            .content
                background-color: #b2e281
                &:before
                    right: -12px
                    vertical-align: middle
                    border-right-color: transparent
                    border-left-color: #b2e281
</style>
