import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import AlanChat from '../views/AlanChat.vue'
import chat from '../page/chat/chat.vue'
import friend from '../page/friend/friend.vue'
import my from '../page/resume/resume.vue'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // 共三个页面： 聊天页面，好友页面，个人简历分别对应一下路由
  routes: [
    {
      path: '/',
      name: 'init',
      component: App,
      redirect: '/chat'
    },
    {
      path: '/alan_chat',
      name: 'AlanChat',
      component: AlanChat,
      meta: { needLogin: true },
      children: [
        {
          path: '/chat',
          component: chat,
          meta: { needLogin: true }
        },
        {
          path: '/friend',
          component: friend,
          meta: { needLogin: true }
        },
        {
          path: '/my',
          component: my,
          meta: { needLogin: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ],
  linkActiveClass: 'active'
})
// router.push({ path: '/chat' });
export default router
