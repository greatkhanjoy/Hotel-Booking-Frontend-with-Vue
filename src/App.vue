<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {},
  data() {
    return {
      message: 'Hello Vue!',
    }
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template>
  <router-view></router-view>
</template>

<style></style>
