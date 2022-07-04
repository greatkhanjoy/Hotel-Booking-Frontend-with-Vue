<template>
  <div>
    <router-link :to="{ name: 'Home' }">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
    </router-link>
    <h2
      class="mt-6 text-center text-3xl font-extrabold text-gray-900"
      v-if="msg === ''"
    >
      Forgot password?
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600" v-if="msg === ''">
      Enter your email address and we'll send you a link to reset your password.
    </p>
    <h2
      class="mt-6 text-center text-3xl font-extrabold text-gray-900"
      v-show="msg !== ''"
    >
      {{ msg }}
    </h2>
  </div>
  <form class="mt-8 space-y-6" @submit.prevent="forgotPassword" method="POST">
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
    </div>
    <div class="flex items-center justify-center space-x-6">
      <div class="text-sm">
        <router-link
          :to="{ name: 'Login' }"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Login
        </router-link>
      </div>
      <div class="text-sm">
        <router-link
          :to="{ name: 'Register' }"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign Up
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
        Reset Password
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      user: {
        email: '',
      },
      msg: '',
    }
  },
  methods: {
    forgotPassword() {
      this.$store.dispatch('forgotPassword', this.user).then((res) => {
        if (res.status === 200) {
          this.msg = 'Please check your email for password reset link!'
        } else {
          this.msg = res.message
        }
      })
    },
  },
}
</script>
