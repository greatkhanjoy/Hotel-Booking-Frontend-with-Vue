<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 text-left">Dashboard</h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->

      <!-- /End replace -->
    </div>
  </main>
</template>
<script>
import Message from 'primevue/message'
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import Toast from 'primevue/toast'
import Button from '../components/elements/Button.vue'
export default {
  name: 'Dashboard',
  components: {
    Button,
    Message,
    ProgressSpinner,
    ProgressBar,
    Toast,
  },
  data() {
    return {
      messages: [
        { severity: 'info', content: 'Dynamic Info Message' },
        { severity: 'success', content: 'Dynamic Success Message' },
        { severity: 'warn', content: 'Dynamic Warning Message' },
      ],
      display: false,
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
  mounted() {
    this.$toast.add({
      severity: 'success',
      summary: 'Success Message',
      detail: 'Order submitted',
      life: 3000,
    })
  },
}
</script>
