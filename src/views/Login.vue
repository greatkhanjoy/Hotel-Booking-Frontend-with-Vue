<template>
  <div>
    <router-link :to="{ name: 'Home' }">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
    </router-link>
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Sign in to your account
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      or Create a new account.
      <router-link
        :to="{ name: 'Register' }"
        class="font-medium text-indigo-600 hover:text-indigo-500"
        >Sign Up</router-link
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
  <form class="mt-8 space-y-6" @submit.prevent="login" method="POST">
    <div class="rounded-md shadow-sm -space-y-px">
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input
          v-model="user.email"
          id="email-address"
          name="email"
          type="email"
          autocomplete="email"
          required=""
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Email address"
        />
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input
          v-model="user.password"
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required=""
          class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Password"
        />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label for="remember-me" class="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>

      <div class="text-sm">
        <router-link
          :to="{ name: 'ForgotPassword' }"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Forgot your password?
        </router-link>
      </div>
    </div>

    <div>
      <button
        type="submit"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <LockClosedIcon
            class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
            aria-hidden="true"
          />
        </span>
        Sign in
      </button>
    </div>
  </form>
</template>

<script>
import { LockClosedIcon } from '@heroicons/vue/solid'
export default {
  name: 'Login',
  components: { LockClosedIcon },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      msg: {},
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', this.user).then((res) => {
        if (res.status === 200) {
          this.msg = {}
          this.msg.success = 'Successfully logged in!'
          setTimeout(() => {
            this.$router.push({ name: 'Dashboard' })
          }, 1000)
        } else {
          this.msg = {}
          this.msg.error = res.message
        }
      })
    },
  },
}
</script>
