<template>
  <div class="chapter">
    <div v-loading="loging">
      <el-card class="box-card">
        <div class="box-left">
          <el-image
            src="https://cdn.v2ex.com/gravatar/06b5cb9dd95bb0f00a42e56faa73cfd2?s=48&d=retro"
            fit="fit">
          </el-image>
        </div>
        <div class="box-right">
          <div slot="header" class="clearfix">
            <span>{{ book.bookName }}</span>
            <el-tag type="success" style="float: right;">{{ book.bookStatus }}</el-tag>
          </div>
          <div>
            <p><strong>作者:</strong> {{ book.bookAuthor || '未知' }}</p>
            <p><strong>出版社:</strong> {{ book.bookPress }}</p>
            <p><strong>简介:</strong> {{ book.bookDescription }}</p>
            <p>
              <strong>标签:</strong> 
              <el-tag v-for="tag in bookTags" :key="tag" class="book-tag">{{ tag }}</el-tag>
            </p>
          </div>
        </div>
      </el-card>
      <el-card class="infinite-list-wrapper" style="overflow:auto">
        <ul 
          class="list"
          v-infinite-scroll="load" 
          infinite-scroll-disabled="disabled"
        >
          <div v-for="record in records" class="list-item" :key="record.chapterId">
            <p @click="openBookContent(record.chapterId)">
              {{ record.chapterName }}
            </p>
          </div>
        </ul>
      </el-card>
    </div>
    <div class="top-right-element" @click="goBack()">
      Go Back.
    </div>
  </div>
</template>

<script>
import { list } from '@/api/chapter';
import { getBookInfoByBookId } from '@/api/book';
export default {
  name: 'BookChapter',
  props: [
    'bookId'
  ],
  data() {
    return {
      loging: false,
      records: [],
      total: 1,
      size: 10,
      book: {},
      count: 10,
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    noMore () {
      console.log("noMore worked")
      return parseInt(this.count/10) > Math.ceil(this.total/10)
    },
    disabled () {
      console.log("disabled worked")
      return this.loading || this.noMore
    },
    bookTags() {
      return this.book.bookTags.split(',');
    }
  },
  methods: {
    fetchData() {
      this.loading = true;
      getBookInfoByBookId(this.bookId).then(response => {
        this.book = response.data.data;
        console.log(this.book)
        this.loading = false;
      }).catch(error => {
        console.error('Error fetching data:', error);
        this.loading = false;
      });
    },
    
    handlePageChange(page) {
      this.current = page;
      this.fetchData();
    },
    load () {
      console.log("load worked")
      list({
        pageNum: parseInt((this.count)/10),
        pageSize: this.size,
        bookId: this.bookId
      })
      .then(response => {
        const data = response.data;
        this.records = this.records.concat(data.records || []);
        this.total = data.total;
        this.size = data.size;
        this.count += data.size;
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    openBookContent(chapterId){
      this.$router.push({ name: 'BookContent', query: { chapterId: chapterId } });
    },
    goBack(){
      this.$router.push({
        name: 'BookPage',
      });
    }
  },
};
</script>

<style scoped>
.chapter {
  max-width: 900px;
  margin: 5rem auto;
  padding: 20px;
}
.list-item {
  height: 38px;
}
.list-item p{
  text-align: start;
  cursor: pointer;
}
.list-item p:hover{
  color: #409EFF;
}
.box-card {
  margin-bottom: 10px;
}
.box-card ::v-deep .el-card__body {
  display: flex;
  align-items: center;
}
.el-image {
  width: 138px;
  height: 182px;
}
.box-right {
  margin-left: 1rem;
}
.box-right p {
  text-align: start;
}
.book-tag {
  margin: 0px 3px;
}
.top-right-element {
  position: absolute;
  top: 5%;
  left: 5%;
  z-index: 9999;
  background-color: lightblue;
  padding: 10px;
  border: 1px solid #000;
  cursor: pointer;
}
</style>