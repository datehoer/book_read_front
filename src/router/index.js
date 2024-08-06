// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/HomePage.vue';
import About from '@/components/AboutPage.vue';
import book from '@/views/book.vue'
import bookChapter from '@/views/bookChapter.vue'
import bookContent from '@/views/bookContent.vue'
import loginPage from '@/views/login.vue'
import Cookies from 'js-cookie';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: About,
    meta: { title: '关于' }
  },
  {
    path: "/book",
    name: "BookPage",
    component: book,
    meta: { requiresAuth: true, title: '书籍列表' },
  },
  {
    path: "/book/:bookId/",
    name: "BookChapter",
    component: bookChapter,
    props: true,
    meta: { requiresAuth: true, title: '章节列表' },
  },
  {
    path: '/book/:bookId/:chapterId',
    name: 'BookContent',
    component: bookContent,
    props: true,
    meta: { requiresAuth: true, title: '内容详情' },
  },
  {
    path: "/login",
    name: "loginPage",
    component: loginPage,
    meta: { title: '登录' }
  }
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    const cookie = Cookies.get("book-token");
    if(cookie){
      next();
    }else{
      next({
        name: 'loginPage'
      })
    }
  } else {
    next();
  }
})
export default router;
