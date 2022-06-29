<template>
  <div v-if="verified">
    <div>
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Set your password
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Enter your new password.
      </p>
      <h2
        class="mt-6 text-center text-3xl font-extrabold text-gray-900"
        v-show="msg !== ''"
      >
        {{ msg }}
      </h2>
    </div>
    <form class="mt-8 space-y-6" @submit.prevent="resetPassword" method="POST">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            v-model="user.password"
            id="password"
            name="password"
            type="password"
            required=""
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="confirm-password" class="sr-only">Confirm password</label>
          <input
            v-model="user.confirmPassword"
            id="confirm-password"
            name="confirm-password"
            type="password"
            required=""
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Confirm password"
          />
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
  </div>
  <div v-else>
    <div v-show="msg">
      <div
        class="mt-10 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
        role="alert"
      >
        <p class="font-bold">Error</p>
        <p>{{ msg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResetPassword',
  data() {
    return {
      user: {
        password: '',
        confirmPassword: '',
        email: this.$route.query.email,
        token: this.$route.query.token,
      },
      msg: '',
      verified: false,
    }
  },
  methods: {
    verifyResetLink() {
      this.$store.dispatch('verifyResetLink', this.user).then((res) => {
        if (res.status === 200) {
          this.verified = true
        } else {
          this.verified = false
          this.msg = res.message
        }
      })
    },
    resetPassword() {
      this.msg = ''
      if (this.user.password !== this.user.confirmPassword) {
        this.msg = 'Passwords do not match'
        return
      }
      this.$store.dispatch('resetPassword', this.user).then((res) => {
        if (res.status === 200) {
          this.msg = 'Password changed successfully!'
        } else {
          this.msg = res.message
        }
      })
    },
  },
  created() {
    this.verifyResetLink()
  },
}
</script>
