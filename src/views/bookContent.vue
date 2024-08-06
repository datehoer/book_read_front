<template>
  <div class="container">
    <div v-loading="loading" class="box-card">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/book' }">书籍列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/book/'+bookId }">章节列表</el-breadcrumb-item>
        <el-breadcrumb-item>内容详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <h1>{{ title }}</h1>
        <el-divider></el-divider>
        <div v-html="content.chapterContent"></div>
      </el-card>
      <div class="navigation-arrows">
        <el-button
          class="chapter-button left"
          v-if="prevChapterId"
          icon="el-icon-arrow-left"
          @click="goToChapter(prevChapterId)"
        ></el-button>
        <el-button
          class="chapter-button right"
          v-if="nextChapterId"
          icon="el-icon-arrow-right"
          @click="goToChapter(nextChapterId)"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getContentByChapterId } from "@/api/content";
import { getChapterNeighbors } from '@/api/chapter';

export default {
  name: "BookContent",
  props: [
    "chapterId",
  ],
  data() {
    return {
      loading: false,
      title: "",
      content: {},
      prevChapterId: "",
      nextChapterId: "",
      bookId: "",
      breadList: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    chapterId: 'fetchData'
  },
  methods: {
    fetchData(){
      this.loading = true;
      getContentByChapterId({
        chapterId: this.chapterId
      })
      .then(response => {
        this.content = response.data.data;
        this.bookId = this.content.bookId
        this.loading = false;
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
      getChapterNeighbors({
        chapterId: this.chapterId
      }).then(response => {
        let chapters = response.data.data
        const currentIndex = chapters.findIndex(chapter => chapter.chapterId === this.chapterId);
        this.title = chapters[currentIndex].chapterName
        if (currentIndex !== -1) {
          if (currentIndex > 0) {
            this.prevChapterId = chapters[currentIndex - 1].chapterId;
          }
          if (currentIndex < chapters.length - 1) {
            this.nextChapterId = chapters[currentIndex + 1].chapterId;
          }
        }
      });
    },
    goToChapter(chapterId) {
      this.$router.push({
        name: 'BookContent',
        params: { chapterId: chapterId }
      }).then(() => {
        window.scrollTo(0, 0);
      });
    },
    goBack(){
      this.$router.push({
        name: 'BookChapter',
        params: {
          bookId: this.bookId
        }
      });
    }
  },
};
</script>

<style scoped>
.box-card {
  max-width: 900px;
  margin: 5rem auto;
  padding: 20px;
  text-align: start;
}
.simplebar-content-wrapper {
  overflow: auto;
}
.navigation-arrows {
  position: relative;
  height: 0;
}
.chapter-button {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background-color: #444;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: bold;
}
.chapter-button.left {
  left: 15px;
}
.chapter-button.right {
  right: 15px;
}
</style>
