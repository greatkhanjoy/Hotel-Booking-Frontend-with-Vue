<template>
  <div
    class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
  >
    <div class="flex space-x-4">
      <div class="w-1/4 flex-col">
        <Card class="bg-[#FEBB02]">
          <template #content>
            <div class="space-y-3">
              <h5 class="text-xl">Search</h5>
              <h5>Destination :</h5>
              <input
                type="text"
                class="w-full border-0"
                placeholder="What's your destination?"
                v-model="destination"
              />
              <h5>Check-in & Check-out date:</h5>
              <Calendar
                id="checkin"
                v-model="dates"
                selectionMode="range"
                :manualInput="false"
                placeholder="Check-in and Check-out date"
                class="w-full border-white"
                :showIcon="true"
              />
              <h5>Min & Max Price: {{ minAndMax }}</h5>
              <Slider
                v-model="minAndMax"
                id="priceSlider"
                :range="true"
                class="w-full"
                :step="10"
                :max="500"
              />
            </div>
          </template>
          <template #footer>
            <div class="flex space-x-2 justify-center">
              <Button
                label="Search"
                class="p-button-primary primary-btn py-3"
              />
              <Button
                @click="getHotels(), (destination = '')"
                label="Reset"
                class="p-button-secondary primary-btn py-3"
              />
            </div>
          </template>
        </Card>
      </div>
      <div class="w-3/4 flex-col px-3">
        <h4 class="text-2xl mb-5">
          {{ hotels.count > 0 ? hotels.count : 'No' }} hotels found
        </h4>
        <!-- Item Container  -->
        <div class="item-conatiner py-1 space-y-5">
          <template v-for="hotel in hotels.items" key="hotel._id">
            <!-- Single Item  -->
            <div
              class="single-item flex justify-between space-x-2 border-[#0D89EC] border-[1px] p-4"
            >
              <img
                :src="$store.state.site_url + hotel.featuredImage"
                alt=""
                class="w-[200px]"
              />
              <div class="px-2">
                <div class="space-x-2 flex items-center">
                  <h2 class="text-xl font-bold text-blue-800">
                    {{ hotel.name }}
                  </h2>
                  <span class="flex space-x-1">
                    <i class="pi pi-star-fill text-orange-400"></i>
                    <i class="pi pi-star-fill text-orange-400"></i>
                    <i class="pi pi-star-fill text-orange-400"></i>
                    <i class="pi pi-star-fill text-orange-400"></i>
                    <i class="pi pi-star text-orange-400"></i>
                  </span>
                </div>
                <p class="font-light">
                  {{ hotel.desc }}
                </p>
              </div>

              <div class="space-y-4">
                <div class="flex space-x-3">
                  <div>
                    <h1 class="leading-none">Good</h1>
                    <span class="text-xs"
                      >{{ hotel.cheapestPrice }} reviews</span
                    >
                  </div>
                  <span
                    class="bg-[#003580] text-white py-1 w-10 h-8 rounded-tr rounded-tl rounded-br text-center items-center"
                    >7.5</span
                  >
                </div>
                <Button
                  label="show prices"
                  class="primary-btn text-base px-3"
                />
              </div>
            </div>
            <!-- Single Item  -->
          </template>
        </div>
        <!-- End Item Container  -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Slider from 'primevue/slider'
import store from '../../store'
export default {
  components: {
    Button,
    Slider,
    Card,
    InputNumber,
    InputText,
    Dropdown,
    Calendar,
  },
  data() {
    return {
      hotels: [],
      destination: null,
      minAndMax: [50, 120],
      dates: null,
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
      if (this.destination || this.minAndMax) {
        let minprice = this.minAndMax[0]
        let maxprice = this.minAndMax[1]
        axios
          .get(
            `${store.state.site_url}/api/hotels/search?${
              this.destination ? 'city=' + this.destination : ''
            }&minprice=${minprice || 0}&maxprice=${maxprice || 10000}`
          )
          .then((response) => {
            this.hotels = response.data
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    getHotels() {
      axios
        .get(store.state.site_url + '/api/hotels')
        .then((response) => {
          this.hotels = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getSearchResults() {
      let query = ''
      if (this.$route.query.city) {
        query += '&city=' + this.$route.query.city
      }
      if (this.$route.query.checkin) {
        query += '&checkin=' + this.$route.query.checkin
      }
      if (this.$route.query.checkout) {
        query += '&checkout=' + this.$route.query.checkout
      }
      axios
        .get(store.state.site_url + '/api/hotels/search?' + query)
        .then((response) => {
          this.hotels = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  created() {
    if (this.$route.query.city) {
      this.getSearchResults()
    } else {
      this.getHotels()
    }
  },
  watch: {
    destination(newDestination, oldDestination) {
      if (newDestination.length > 2 && newDestination !== oldDestination) {
        this.search()
      } else if (newDestination.length > 0) {
        this.getHotels()
      }
    },
    minAndMax(newminAndMax, oldminAndMax) {
      if (
        newminAndMax[0] !== oldminAndMax[0] ||
        newminAndMax[1] !== oldminAndMax[1]
      ) {
        this.search()
      }
    },
    deep: true,
  },
}
</script>
