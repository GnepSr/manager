import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/signin.vue')
    },
    {
      path: '/findPassWorld',
      name: 'findPassWorld',
      component: () => import('../views/findPassWorld.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue'),
      redirect: '/welcome',
      children: [{
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/welcome.vue')
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/users.vue')
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('../components/power/rights.vue')
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('../components/power/roles.vue')
      },
      {
        path: '/report',
        name: 'report',
        component: () => import('../components/report/report.vue')
      }
      ]
    }
  ]
})

// // 挂载路由守卫 防止没有权限也能访问特定地址
// router.beforeEach((to, from, next) => {
//   // 访问路径是login放行
//   if (to.path === '/login'||to.path === '/signin') return next()
//   //  获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   // 没有token跳转到登录页
//   if (!tokenStr) return next('/login')
//   // 有token放行
//   next()
// })

export default router