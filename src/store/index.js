import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
Vue.use(Vuex)

// 获取当前时间
const now = new Date()
const state = {
  top: '10%',
  left: '10%',
  width: '70%',
  height: '74%',
  lastSize: {
    top: '10%',
    left: '10%',
    width: '70%',
    height: '74%'
  },
  // 输入的搜索值
  searchText: '',
  // 当前登录用户
  user: {
    name: '',
    img: '',
    user_id: ''
  },
  // 对话好友列表
  chatlist: [
    {
        	id: 1,
        	user: {
        		name: '我妈妈贼贤惠',
        img: 'static/images/mother.jpg',
        user_id: 'b9183b8474004f8d985a95ee2970fd1f'
        	},
        	messages: [
        {
                	content: '赵爽，吃饭了没', // 聊天内容
                	date: now // 时间
        },
        {
                	content: '家伙在干啥里',
                	date: now
        }
        	],
      index: 1 // 当前在聊天列表中的位置,从1开始
    }
  ],
  // 好友列表
  friendlist: [
    {
      id: 0,
      wxid: '', // 微信号
      initial: '新的朋友', // 姓名首字母
      img: require('../../public/images/newfriend.jpg'), // 头像
      signature: '', // 个性签名
      nickname: '新的朋友', // 昵称
      sex: 0, // 性别 1为男，0为女
      remark: '新的朋友', // 备注
      area: '' // 地区
    },
    {
      id: 1,
      wxid: 'jie19741004', // 微信号
      initial: 'D', // 姓名首字母
      img: require('../../public/images/mother.jpg'), // 头像
      signature: '', // 个性签名
      nickname: '秋风', // 昵称
      sex: 0, // 性别 1为男，0为女
      remark: '我妈妈贼贤惠', // 备注
      area: '冰岛' // 地区
    },
    {
      id: 2,
      wxid: 'ZXW15916705185',
      initial: 'Z',
      img: require('../../public/images/father.jpg'),
      signature: '',
      nickname: 'cat',
      sex: 1,
      remark: '我爸爸贼勤快',
      area: ''
    },
    {
      id: 3,
      wxid: 'hringur_',
      initial: 'Z',
      img: require('../../public/images/zyx.jpg'),
      signature: '我们会变成什么不重要...故事精彩就好...',
      nickname: '圈圈年轮',
      sex: 0,
      remark: '西瓜呀',
      area: '冰岛'
    }
  ],
  // emoji表情
  emojis: [
    { file: '100.gif', code: '/::)', title: '微笑', reg: /\/::\)/g },
    { file: '101.gif', code: '/::~', title: '伤心', reg: /\/::~/g },
    { file: '102.gif', code: '/::B', title: '美女', reg: /\/::B/g },
    { file: '103.gif', code: '/::|', title: '发呆', reg: /\/::\|/g },
    { file: '104.gif', code: '/:8-)', title: '墨镜', reg: /\/:8-\)/g },
    { file: '105.gif', code: '/::<', title: '哭', reg: /\/::</g },
    { file: '106.gif', code: '/::$', title: '羞', reg: /\/::\$/g },
    { file: '107.gif', code: '/::X', title: '哑', reg: /\/::X/g },
    { file: '108.gif', code: '/::Z', title: '睡', reg: /\/::Z/g },
    { file: '109.gif', code: '/::\'(', title: '哭', reg: /\/::'\(/g },
    { file: '110.gif', code: '/::-|', title: '囧', reg: /\/::-\|/g },
    { file: '111.gif', code: '/::@', title: '怒', reg: /\/::@/g },
    { file: '112.gif', code: '/::P', title: '调皮', reg: /\/::P/g },
    { file: '113.gif', code: '/::D', title: '笑', reg: /\/::D/g },
    { file: '114.gif', code: '/::O', title: '惊讶', reg: /\/::O/g },
    { file: '115.gif', code: '/::(', title: '难过', reg: /\/::\(/g },
    { file: '116.gif', code: '/::+', title: '酷', reg: /\/::\+/g },
    { file: '117.gif', code: '/:--b', title: '汗', reg: /\/:--b/g },
    { file: '118.gif', code: '/::Q', title: '抓狂', reg: /\/::Q/g },
    { file: '119.gif', code: '/::T', title: '吐', reg: /\/::T/g },
    { file: '120.gif', code: '/:,@P', title: '笑', reg: /\/:,@P/g },
    { file: '121.gif', code: '/:,@-D', title: '快乐', reg: /\/:,@-D/g },
    { file: '122.gif', code: '/::d', title: '奇', reg: /\/::d/g },
    { file: '123.gif', code: '/:,@o', title: '傲', reg: /\/:,@o/g },
    { file: '124.gif', code: '/::g', title: '饿', reg: /\/::g/g },
    { file: '125.gif', code: '/:|-)', title: '累', reg: /\/:\|-\)/g },
    { file: '126.gif', code: '/::!', title: '吓', reg: /\/::!/g },
    { file: '127.gif', code: '/::L', title: '汗', reg: /\/::L/g },
    { file: '128.gif', code: '/::>', title: '高兴', reg: /\/::>/g },
    { file: '129.gif', code: '/::,@', title: '闲', reg: /\/::,@/g },
    { file: '130.gif', code: '/:,@f', title: '努力', reg: /\/:,@f/g },
    { file: '131.gif', code: '/::-S', title: '骂', reg: /\/::-S/g },
    { file: '133.gif', code: '/:,@x', title: '秘密', reg: /\/:,@x/g },
    { file: '134.gif', code: '/:,@@', title: '乱', reg: /\/:,@@/g },
    { file: '135.gif', code: '/::8', title: '疯', reg: /\/::8/g },
    { file: '136.gif', code: '/:,@!', title: '哀', reg: /\/:,@!/g },
    { file: '137.gif', code: '/:!!!', title: '鬼', reg: /\/:!!!/g },
    { file: '138.gif', code: '/:xx', title: '打击', reg: /\/:xx/g },
    { file: '139.gif', code: '/:bye', title: 'bye', reg: /\/:bye/g },
    { file: '142.gif', code: '/:handclap', title: '鼓掌', reg: /\/:handclap/g },
    { file: '145.gif', code: '/:<@', title: '什么', reg: /\/:<@/g },
    { file: '147.gif', code: '/::-O', title: '累', reg: /\/::-O/g },
    { file: '153.gif', code: '/:@x', title: '吓', reg: /\/:@x/g },
    { file: '155.gif', code: '/:pd', title: '刀', reg: /\/:pd/g },
    { file: '156.gif', code: '/:<W>', title: '水果', reg: /\/:<W>/g },
    { file: '157.gif', code: '/:beer', title: '酒', reg: /\/:beer/g },
    { file: '158.gif', code: '/:basketb', title: '篮球', reg: /\/:basketb/g },
    { file: '159.gif', code: '/:oo', title: '乒乓', reg: /\/:oo/g },
    { file: '195.gif', code: '/:circle', title: '跳舞', reg: /\/:circle/g },
    { file: '160.gif', code: '/:coffee', title: '咖啡', reg: /\/:coffee/g }
  ],
  // 得知当前选择的是哪个对话
  selectId: 1,
  // 得知当前选择的是哪个好友
  selectFriendId: 0
}

//  可以改变state中的值
const mutations = {
  changePosition(state, value) {
    state.top = value.top
    state.left = value.left
    state.lastSize.top = value.top
    state.lastSize.left = value.left
  },
  fullScreen(state, value) {
    state.top = value.top
    state.left = value.left
    state.width = value.width
    state.height = value.height
  },
  initChatList(state, value) {
    state.chatlist = value
  },
  // 从localStorage 中获取数据
  initData(state) {
    const data = localStorage.getItem('vue-chat')
    if (data) {
      state.chatlist = JSON.parse(data)
    }
  },
  // 获取搜索值
  search(state, value) {
    state.searchText = value
  },
  // 得知用户当前选择的是哪个对话。便于匹配对应的对话框
  selectSession(state, value) {
    state.selectId = value
  },
  // 得知用户当前选择的是哪个好友。
  selectFriend(state, value) {
    state.selectFriendId = value
  },
  selectCurrentUser(state, value) {
    state.user.name = value.name
    state.user.img = value.img
    state.user.user_id = value.user_id
  },
  // 发送信息
  sendMessage(state, msg) {
    console.log(state.selectId)
    const result = state.chatlist.find(session => session.id === state.selectId)
    result.messages.push({
      content: msg.content,
      date: new Date(),
      self: true
    })
    if (result.user.name === '机器人') {
      setTimeout(() => {
        result.messages.push({
          content: msg.reply,
          date: new Date(),
          self: false
        })
      }, 500)
    }
  },

  receiveMessage(state, data) {
    console.log('--------------------', data)
    var msg = {
      content: data.message
    }
    const result_sender = state.chatlist.find(session => session.user.user_id === data.sender_user_id)
    // let result_receiver = state.chatlist.find(session => session.user.user_id === data.receiver_user_id);
    // let current_select_session = state.chatlist.find(session => session.id === state.selectId);
    // if (result_sender.user.user_id === current_select_session.user.user_id) {
    //     result_sender.messages.push({
    //            content: msg.content,
    //            date: new Date(),
    //            self: false
    //    });
    // } else {
    result_sender.messages.push({
      content: msg.content,
      date: new Date(),
      self: false
    })
    // }
    if (result_sender.user.name === '机器人') {
      setTimeout(() => {
        result_sender.messages.push({
          content: msg.reply,
          date: new Date(),
          self: false
        })
      }, 500)
    }
  },
  // 选择好友后，点击发送信息。判断在聊天列表中是否有该好友，有的话跳到该好友对话。没有的话
  // 添加该好友的对话 并置顶
  send(state) {
    const result = state.friendlist.find(friend => friend.id === state.selectFriendId)
    const msg = state.chatlist.find(msg => msg.user.name === result.remark)
    if (!msg) {
      state.selectId = 1
      for (let i = 0; i < state.chatlist.length; i++) {
        state.chatlist[i].id++
        state.chatlist[i].index++
      }
      state.chatlist.unshift({
        id: 1,
        user: {
          name: result.remark,
          img: result.img
        },
        messages: [
          {
            content: '已经置顶聊天，可以给我发信息啦！',
            date: new Date()
          }
        ],
        index: 1
      })
    } else {
      state.selectId = msg.index
      router.push({ path: '/chat' })
    }
  }
}
// 相当于计算属性 当state中的值改变的时候  函数的返回值会重新计算
const getters = {
  // 筛选出含有搜索值的聊天列表
  searchedChatlist: function(state) {
    const sessions = state.chatlist.filter(sessions => sessions.user.name.includes(state.searchText))
    return sessions
  },
  // 筛选出含有搜索值的好友列表
  searchedFriendlist(state) {
    const friends = state.friendlist.filter(friends => friends.remark.includes(state.searchText))
    return friends
  },
  // 通过当前选择是哪个对话匹配相应的对话
  selectedChat(state) {
    const session = state.chatlist.find(session => session.id === state.selectId)
    return session
  },
  // 通过当前选择是哪个好友匹配相应的好友
  selectedFriend(state) {
    const friend = state.friendlist.find(friend => friend.id === state.selectFriendId)
    return friend
  },
  messages(state) {
    const session = state.chatlist.find(session => session.id === state.selectId)
    return session.messages
  }
}

const actions = {
  search: ({ commit }, value) => {
    setTimeout(() => {
      commit('search', value)
    }, 100)
  },
  initChatList: ({ commit }, value) => commit('initChatList', value),
  selectCurrentUser: ({ commit }, value) => commit('selectCurrentUser', value),
  selectSession: ({ commit }, value) => commit('selectSession', value),
  selectFriend: ({ commit }, value) => commit('selectFriend', value),
  sendMessage: ({ commit }, msg) => commit('sendMessage', msg),
  receiveMessage: ({ commit }, msg) => commit('receiveMessage', msg),
  send: ({ commit }) => commit('send'),
  initData: ({ commit }) => commit('initData'),
  changePosition: ({ commit }, value) => commit('changePosition', value),
  fullScreen: ({ commit }, value) => commit('fullScreen', value)
}
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

// 监听聊天列表的值， 发生变化就保存在localStorage中
store.watch(
  (state) => state.chatlist,
  (val) => {
    localStorage.setItem('vue-chat', JSON.stringify(val))
  },
  {
    deep: true
  }
)
export default store
