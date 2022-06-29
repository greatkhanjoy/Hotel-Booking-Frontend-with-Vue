<template>
  <div>
    <img
      class="mx-auto h-12 w-auto"
      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
      alt="Workflow"
    />
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Create a new account
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      or Already have an account?
      <router-link
        :to="{ name: 'Login' }"
        class="font-medium text-indigo-600 hover:text-indigo-500"
        >Sign in</router-link
      >
    </p>
    <div
      class="mt-5 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
      role="alert"
      v-if="msg.success"
    >
      <strong class="font-bold">{{ msg.success }}</strong>
    </div>
    <div
      class="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
      v-if="msg.error"
    >
      <strong class="font-bold">{{ msg.error }}</strong>
    </div>
  </div>
  <form class="mt-8 space-y-6" @submit.prevent="register" method="POST">
    <input type="hidden" name="remember" value="true" />
    <div class="rounded-md shadow-sm -space-y-px">
      <div>
        <label for="namefield" class="sr-only">Name</label>
        <input
          id="namefield"
          name="name"
          v-model="user.name"
          type="text"
          required=""
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Name"
        />
      </div>
      <div>
        <label for="username" class="sr-only">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          v-model="user.username"
          required=""
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Username"
        />
      </div>
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input
          id="email-address"
          name="email"
          type="email"
          autocomplete="email"
          required=""
          v-model="user.email"
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Email address"
        />
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          v-model="user.password"
          required=""
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Password"
        />
      </div>
    </div>

    <div>
      <button
        type="submit"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign up
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        username: '',
        email: '',
        password: '',
        remember: true,
      },
      msg: {},
    }
  },
  methods: {
    register() {
      this.$store.dispatch('register', this.user).then((res) => {
        if (res.status === 200) {
          this.msg = {}
          this.msg.success = 'Successfully registered'
          setTimeout(() => {
            this.$router.push({ name: 'Login' })
          }, 2000)
        } else {
          this.msg = {}
          this.msg.error = res.message
        }
      })
    },
  },
}
</script>
