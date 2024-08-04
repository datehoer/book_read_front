// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/HomePage.vue';
import About from '@/components/AboutPage.vue';
import book from '@/views/book.vue'
import bookChapter from '@/views/bookChapter.vue'
import bookContent from '@/views/bookContent.vue'

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: About,
  },
  {
    path: "/book",
    name: "BookPage",
    component: book
  },
  {
    path: "/book/:bookId",
    name: "BookChapter",
    component: bookChapter,
    props: true
  },
  {
    path: '/content',
    name: 'BookContent',
    component: bookContent,
    props: route => ({ 
      chapterId: route.query.chapterId
    })
  }
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
