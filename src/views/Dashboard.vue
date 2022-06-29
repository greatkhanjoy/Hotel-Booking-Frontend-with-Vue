<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 text-left">Dashboard</h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      content goose her
      <!-- /End replace -->
    </div>
  </main>
</template>
<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      //
    }
  },
  methods: {
    getUser() {
      this.$store.dispatch('getUser')
    },
  },
  created() {
    // this.getUser()
  },
}
</script>
