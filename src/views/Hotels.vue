<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 text-left">Hotels</h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Heading Start -->
      <Heading
        heading="All Hotels"
        description="All Hotels"
        classNames="space-x-2"
      >
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
              <th scope="col" class="px-6 py-3">City</th>
              <th scope="col" class="px-6 py-3">Cheapest price</th>
              <th scope="col" class="px-6 py-3">Rating</th>
              <th scope="col" class="px-6 py-3">Image</th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
                <span class="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="hotel in hotels" :key="hotel._id">
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {{ hotel.name }}
                </th>
                <td class="px-6 py-4">{{ hotel.city }}</td>
                <td class="px-6 py-4">{{ hotel.cheapestPrice }}</td>
                <td class="px-6 py-4">{{ hotel.rating }}</td>
                <td class="px-6 py-4">
                  <Image
                    :src="$store.state.site_url + hotel.featuredImage"
                    alt="Image"
                    width="50"
                    preview
                  />
                </td>
                <td class="px-6 py-4 text-right space-x-4">
                  <Button type="primary" title="Edit" />
                  <Button type="danger" title="Delete" />
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
import Image from 'primevue/image'
import Button from '../components/elements/Button.vue'
import Heading from '../components/Heading.vue'
export default {
  name: 'Hotels',
  components: {
    Image,
    Button,
    Heading,
    CheckIcon,
    ChevronDownIcon,
    LinkIcon,
    PencilIcon,
  },
  data() {
    return {
      hotels: [],
    }
  },
  methods: {
    getHotels() {
      axios
        .get(this.$store.state.site_url + '/api/hotels')
        .then((response) => {
          this.hotels = response.data.items
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  created() {
    this.getHotels()
  },
}
</script>
