<template>
  <div>
    <img
      class="mx-auto h-12 w-auto"
      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
      alt="Workflow"
    />
    <div v-show="msg.success">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ msg.success }}
      </h2>
    </div>
    <div v-show="msg.error">
      <div
        class="mt-10 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
        role="alert"
      >
        <p class="font-bold">{{ msg.error }}</p>
      </div>
      <div class="flex space-x-5 justify-center m-5">
        <router-link
          :to="{ name: 'Home' }"
          class="bg-green-500 text-white rounded-full px-6 py-2"
          >Home</router-link
        >
        <router-link
          :to="{ name: 'Login' }"
          class="bg-[#4338CA] text-white rounded-full px-6 py-2"
          >SignIn</router-link
        >
        <router-link
          :to="{ name: 'Register' }"
          class="bg-blue-500 text-white rounded-full px-6 py-2"
          >SignUp</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Verify',
  data() {
    return {
      user: {
        email: this.$route.query.email,
        token: this.$route.query.token,
      },
      msg: {},
    }
  },
  methods: {
    verify() {
      this.$store.dispatch('verify', this.user).then((res) => {
        if (res.status === 200) {
          this.msg = { success: 'Your account verified successfuly!' }
          setTimeout(() => {
            this.$router.push({ name: 'Login' })
          }, 1000)
        } else {
          this.msg = { error: res.message }
        }
      })
    },
  },
  created() {
    this.verify()
  },
  mounted() {},
  beforeCreate() {},
}
</script>
