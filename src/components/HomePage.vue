<template>
  <div class="home">
    <h1>Welcome to the Home Page</h1>
    <p>{{ message }}</p>
    <button @click="changeMessage">Change Message</button>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      message: 'Hello from Home page!'
    };
  },
  methods: {
    changeMessage() {
      this.message = 'Message has been changed!';
    }
  }
};
</script>

<style scoped>
.home {
  text-align: center;
}
</style>