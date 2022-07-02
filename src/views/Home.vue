<template>
  <Slider />
  <div class="relative">
    <div class="flex items-center justify-center">
      <div
        class="flex items-center justify-center space-x-3 sm:flex-col sm:space-y-5 bg-gray-200 py-10 px-12 rounded-lg shadow-lg absolute -top-24"
      >
        <div class="flex-col space-y-1">
          <h5 class="">Destination:</h5>
          <input
            ref="email"
            type="text"
            placeholder="Where are you going?"
            class="border-0"
            v-model="destination"
          />
        </div>
        <div class="flex-col space-y-1">
          <h5 class="">Check-in Date:</h5>
          <input
            ref="checkin"
            type="date"
            placeholder="Check-in date"
            v-model="checkInDate"
            class="border-0"
          />
        </div>
        <div class="flex-col space-y-1">
          <h5 class="">Check-out Date:</h5>
          <input
            ref="checkout"
            type="date"
            placeholder="Check-out date"
            v-model="checkOutDate"
            class="border-0"
          />
        </div>

        <button
          type="submit"
          @click="search"
          class="mt-7 flex px-6 space-x-2 p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <SearchIcon class="w-5" /> <span>Find now</span>
        </button>
      </div>
    </div>
  </div>
  <City />
</template>
<script>
import { SearchIcon } from '@heroicons/vue/solid'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import City from '../components/City.vue'
import Hero from '../components/Hero.vue'
import ProductList from '../components/ProductList.vue'
import Slider from '../components/Slider.vue'
export default {
  name: 'Home',
  components: {
    Calendar,
    Dropdown,
    Hero,
    Slider,
    ProductList,
    SearchIcon,
    City,
  },
  data() {
    return {
      destination: null,
      checkOutDate: null,
      checkInDate: null,
      invalidDates: null,
      cities: [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
      ],
    }
  },
  methods: {
    search() {
      if (this.destination) {
        this.$router.push({
          name: 'FHotels',
          query: {
            city: this.destination,
            checkin: this.checkInDate,
            checkout: this.checkOutDate,
          },
        })
      } else {
        this.$refs.email.focus()
        this.$refs.email.classList.add('bg-red-100')
      }
    },
  },
  created() {},
}
</script>
