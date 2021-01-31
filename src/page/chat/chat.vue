<template>
  <div class="content">
    <div ref="friendlist" class="friendlist">
      <div ref="search" class="search">
        <search />
      </div>

      <div class="chatlist" :style="{ height: chatlist_height + 'px' }">
        <chatlist />
      </div>
    </div>
    <div id="chatbox" ref="chatbox" class="chatbox">
      <div ref="message" class="message" :style="{ height: message_height + 'px' }">
        <message />
      </div>
      <div ref="v_text" class="v_text">
        <v-text />
      </div>
    </div>
  </div>
</template>

<script>
import search from '../../components/search/search'
import chatlist from '../../components/chatlist/chatlist'
import message from '../../components/message/message'
import vText from '../../components/text/text'
import { mapState } from 'vuex'
export default {
  components: {
   	 search,
   	 chatlist,
   	 message,
   	 vText
  },
  data() {
    return {
      message_height: null,
      chatlist_height: null
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
    height: function() {
      this.chatlist_height = this.$refs.friendlist.clientHeight - this.$refs.search.clientHeight
      this.message_height = this.$refs.chatbox.clientHeight - this.$refs.v_text.clientHeight
    }
  },
  created() {
  },
  mounted() {
    this.chatlist_height = this.$refs.friendlist.clientHeight - this.$refs.search.clientHeight
    this.message_height = this.$refs.chatbox.clientHeight - this.$refs.v_text.clientHeight
    window.addEventListener('keydown', this.keydown)
  },
  methods: {
    keydown: function(event) {
      if (event.keyCode === 122) {
        console.log('我按了F11键', this.$refs.chatbox.clientHeight, this.$refs.chatbox)

        this.chatlist_height = this.$refs.friendlist.clientHeight - this.$refs.search.clientHeight
        this.message_height = this.$refs.chatbox.clientHeight - this.$refs.v_text.clientHeight
        console.log('hhaha')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.content
  display: flex
  width: 100%
  height 100%
  .friendlist
    width: 250px
    height 100%
    background: rgb(230,230,230)
  .chatbox
    height 100%
    flex: 1
</style>
