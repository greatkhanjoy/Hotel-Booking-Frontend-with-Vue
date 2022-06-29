<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 text-left">Users</h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Heading Start -->
      <Heading heading="Users" description="All Users" classNames="space-x-2">
        <Button title="+ Add New" type="success" />
      </Heading>
      <!-- /Heading End -->

      <!-- Table  -->
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Email</th>
              <th scope="col" class="px-6 py-3">Role</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Image</th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
                <span class="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="user in users" :key="user._id">
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {{ user.name }}
                </th>
                <td class="px-6 py-4">{{ user.email }}</td>
                <td class="px-6 py-4">
                  {{ user.role === 'admin' ? 'Admin' : 'User' }}
                </td>
                <td class="px-6 py-4">
                  {{ user.verified ? 'Verified' : 'Unverified' }}
                </td>
                <td class="px-6 py-4">
                  <img
                    class="h-10 w-10"
                    :src="$store.state.site_url + user.image"
                    alt=""
                  />
                </td>
                <td class="px-6 py-4 text-right space-x-4">
                  <Button
                    type="primary"
                    @clicked="edit(user._id)"
                    title="Edit"
                  />
                  <Button
                    type="danger"
                    @clicked="deleteUser(user._id)"
                    title="Delete"
                  />
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<script>
import {
  CheckIcon,
  ChevronDownIcon,
  LinkIcon,
  PencilIcon,
} from '@heroicons/vue/solid'
import axios from 'axios'
import Button from '../components/elements/Button.vue'
import Heading from '../components/Heading.vue'
export default {
  name: 'Users',
  components: {
    Button,
    Heading,
    CheckIcon,
    ChevronDownIcon,
    LinkIcon,
    PencilIcon,
  },
  data() {
    return {
      users: [],
    }
  },
  methods: {
    getUsers() {
      axios
        .get(this.$store.state.site_url + '/api/users', {
          withCredentials: true,
        })
        .then((response) => {
          this.users = response.data.users
        })
        .catch((error) => {
          console.log(error)
        })
    },
    edit(id) {
      console.log('edit', id)
    },
    deleteUser(id) {
      console.log('deleet', id)
    },
  },
  created() {
    this.getUsers()
  },
}
</script>
