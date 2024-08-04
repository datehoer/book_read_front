<template>
  <div class="about">
    <h1>About Us</h1>
    <p>{{ description }}</p>
    <button @click="toggleDetails">Toggle Details</button>
    <div v-if="showDetails">
      <p>Company Name: {{ companyName }}</p>
      <p>Location: {{ location }}</p>
      <p>Contact: {{ contact }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      description: 'Learn more about our company.',
      showDetails: false,
      companyName: 'Example Corp.',
      location: 'San Francisco, CA',
      contact: 'info@example.com'
    };
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    }
  }
};
</script>

<style scoped>
.about {
  text-align: center;
}

.about div {
  margin-top: 10px;
}
</style>