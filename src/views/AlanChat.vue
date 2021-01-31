<template>
  <div id="alan_chat" ref="kongtiao" :style="{left: left, top: top, width: width, height: height}">
    <div ref="sidebar" class="sidebar" @mousedown="mouseDownHandleelse($event)" @mouseup="mouseUpHandleelse($event)">
      <mycard />
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import mycard from '../components/mycard/mycard.vue'
import { mapState } from 'vuex'
export default {
  components: {
    mycard
  },
  data() {
    return {
      moveDataelse: {
        x: null,
        y: null
      }
    }
  },
  computed: {
    ...mapState([
      'top',
      'left',
      'width',
      'height'
    ])
  },
  watch: {
  },
  created() {
    console.log('---------', this.$refs, this.$refs.kongtiao)
    this.$store.dispatch('initData')
  },
  methods: {
    mouseDownHandleelse(event) {
      // alert(event.clientX, event.clientY, event.pageX, event.pageY, this.$refs.kongtiao.offsetLeft, this.$refs.kongtiao.offsetTop)
      // console.log(event.clientX, event.clientY, event.pageX, event.pageY, this.$refs.kongtiao.offsetLeft, this.$refs.kongtiao.offsetTop)
      this.moveDataelse.x = event.pageX - this.$refs.kongtiao.offsetLeft
      this.moveDataelse.y = event.pageY - this.$refs.kongtiao.offsetTop
      // event.currentTarget.style.cursor = 'move'
      window.onmousemove = this.mouseMoveHandleelse
    },
    mouseMoveHandleelse(event) {
      // console.log(event.clientX, event.clientY, event.pageX, event.pageY, this.$refs.kongtiao.offsetLeft, this.$refs.kongtiao.offsetTop)

      const moveLeft = event.pageX - this.moveDataelse.x + 'px'
      const moveTop = event.pageY - this.moveDataelse.y + 'px'
      this.$refs.kongtiao.style.left = moveLeft
      this.$refs.kongtiao.style.top = moveTop
    },
    mouseUpHandleelse(event) {
      window.onmousemove = null
      // event.currentTarget.style.cursor = 'move'
      // console.log('鼠标松开了')
    }
  }
}
</script>

<style lang="stylus" scoped>
#alan_chat
  display: flex
  border-radius 0px
  margin: 0px auto
  background-color: #fff
  .sidebar
    width: 60px
    height: 100%
    background: #2b2c2f
  .main
    flex: 1
    height: 100%
    background: #f2f2f2
</style>

<style scoped lang='less'>
 #alan_chat{
    // height: 200px;
    // width: 400px;
    position: fixed;
    // top: 150px;
    // left: 550px;
    // cursor: pointer;
  }
</style>
