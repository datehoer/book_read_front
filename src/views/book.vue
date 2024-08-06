<template>
  <div>
    <div class="container" v-loading='loading'>
      <div v-for="record in records" :key="record.bookId" class="record-card">
        <el-image
          style="width: 100px; height: 100px"
          src="https://cdn.v2ex.com/gravatar/06b5cb9dd95bb0f00a42e56faa73cfd2?s=48&d=retro"
          fit="fit"
          class="record-image"
        >
        </el-image>
        <div class="record-info">
          <div class="record-header">
            <span class="record-label">{{ record.bookStatus }}</span>
            <span class="record-title">{{ record.bookName }}</span>
          </div>
          <div class="record-description">
            <p>
              {{ record.bookDescription }}
            </p>
          </div>
          <el-button type="primary" class="buy-button" @click="openBookChapter(record.bookId)">查看详情</el-button>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        @current-change="handlePageChange">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
import { list } from '@/api/book';

export default {
    name: 'BookPage',
  data() {
    return {
      records: [],
      total: 0,
      size: 10,
      current: 1,
      loading: false
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      list({
        pageNum: this.current,
        pageSize: this.size
      })
      .then(response => {
        const data = response.data;
        this.records = data.records || [];
        this.total = data.total;
        this.size = data.size;
        this.current = data.current;
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
    openBookChapter(bookId){
      this.$router.push({
        name: 'BookChapter',
        params: {
          bookId: bookId
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
    max-width: 900px;
    margin: 5rem auto;
}
.record-container {
  max-width: 1200px;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.record-card {
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 10px;
}
.record-image {
  width: 150px;
  height: auto;
  border-radius: 8px;
}
.record-info {
  flex: 1;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
}
.record-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.record-label {
  background-color: #ff4d4f;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}
.record-title {
  font-size: 1.2rem;
  font-weight: bold;
}
.record-description {
  margin: 0.5rem 0;
}
.record-description p {
  font-size: 14px;
  line-height: 22px;
  margin-top: 4px;
  text-align: start;
}

.record-stats {
  margin: 0.5rem 0;
}
.buy-button {
  align-self: flex-start;
}
</style>
