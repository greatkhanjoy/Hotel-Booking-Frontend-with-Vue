<template>
  <Popover class="relative bg-white">
    <div class="mx-auto">
      <div
        class="flex justify-between items-center border-b-2 border-gray-100 pt-10 pb-5 md:justify-start md:space-x-10 px-6 sm:px-6"
      >
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <router-link :to="{ name: 'Home' }">
            <span class="sr-only">Workflow</span>
            <img
              class="h-8 w-auto sm:h-10"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt=""
            />
          </router-link>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <PopoverButton
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Open menu</span>
            <MenuIcon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden md:flex space-x-10">
          <router-link
            :to="{ name: 'Home' }"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Home
          </router-link>

          <router-link
            :to="{ name: 'FHotels' }"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Hotels
          </router-link>
        </PopoverGroup>
        <div
          class="hidden md:flex items-center justify-end md:flex-1 lg:w-0"
          v-if="!$store.getters.isLoggedIn"
        >
          <router-link
            :to="{ name: 'Login' }"
            class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Sign in
          </router-link>
          <router-link
            :to="{ name: 'Register' }"
            class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Sign up
          </router-link>
        </div>
        <div
          class="hidden md:flex items-center justify-end md:flex-1 lg:w-0"
          v-if="$store.getters.isLoggedIn"
        >
          <router-link
            :to="{ name: 'Dashboard' }"
            class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Dashboard
          </router-link>
          <span
            class="ml-5 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            {{ $store.getters.userName }}
          </span>
        </div>
      </div>
      <div class="space-y-10">
        <router-view> </router-view>
      </div>
    </div>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <PopoverPanel
        focus
        class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
      >
        <div
          class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50"
        >
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <div>
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
              </div>
              <div class="-mr-2">
                <PopoverButton
                  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
          </div>
          <div class="py-6 px-5 space-y-6">
            <div v-if="!$store.getters.isLoggedIn">
              <router-link
                :to="{ name: 'Register' }"
                class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign up
              </router-link>
              <p class="mt-6 text-center text-base font-medium text-gray-500">
                Existing customer?
                {{ ' ' }}
                <router-link
                  :to="{ name: 'Login' }"
                  class="text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </router-link>
              </p>
            </div>
            <div v-if="$store.getters.isLoggedIn">
              <p class="mt-6 text-center text-base font-medium text-gray-500">
                <router-link
                  :to="{ name: 'Dashboard' }"
                  class="text-indigo-600 hover:text-indigo-500"
                >
                  Dashboard
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
  <Dialog v-model:visible="this.$store.state.displaySignInModal" class="w-96">
    <div>
      <h3 class="text-center text-2xl">Sign In</h3>
      <form class="mt-8 space-y-6" @submit.prevent="login()" method="POST">
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
    </div>
  </Dialog>
  <Toast />
</template>

<script>
import { MenuIcon, XIcon } from '@heroicons/vue/outline'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
export default {
  components: {
    Dialog,
    MenuIcon,
    XIcon,
    Toast,
  },
  data() {
    return {
      display: false,
      user: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', {
          email: this.user.email,
          password: this.user.password,
        })
        .then((res) => {
          if (res.status === 200) {
            this.$toast.add({
              severity: 'success',
              summary: 'Success Message',
              detail: 'Successfuly Logged in!',
              life: 3000,
            })
            this.$store.commit('setdisplaySignInModal', false)
          } else {
            this.$toast.add({
              severity: 'error',
              summary: 'Error Message',
              detail: 'Login Failed!',
              life: 3000,
            })
          }
        })
    },
  },
}
</script>
