<template>
  <div
    class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
  >
    <!-- head-part  -->
    <div class="flex space-x-4">
      <div class="w-1/4 flex-col">
        <Card class="bg-[#FEBB02]">
          <template #content>
            <div class="space-y-3">
              <h5>Check-in & Check-out date:</h5>
              <Calendar
                @click="dates = null"
                ref="dateSelect"
                @dateSelect="onSelectDate"
                id="checkin"
                v-model="dates"
                selectionMode="range"
                :manualInput="false"
                placeholder="Check-in and Check-out date"
                class="w-full border-white"
                :showIcon="true"
              />
            </div>
          </template>
          <template #footer> </template>
        </Card>
      </div>
      <div class="w-3/4 flex-col px-3 space-y-2">
        <div class="item-head space-y-1" v-if="showResult">
          <div class="item-title flex space-x-4 items-center">
            <h2 class="text-2xl">
              {{ hotel.name }}
            </h2>
            <div class="rating flex space-x-1">
              <i class="pi pi-star-fill text-orange-400 text-sm"></i>
              <i class="pi pi-star-fill text-orange-400 text-sm"></i>
              <i class="pi pi-star-fill text-orange-400 text-sm"></i>
              <i class="pi pi-star-fill text-orange-400 text-sm"></i>
              <i class="pi pi-star text-orange-400 text-sm"></i>
            </div>
          </div>
          <p><i class="pi pi-map-marker"></i> {{ hotel.address }}</p>
        </div>
        <div class="item-image grid grid-cols-4 gap-2" v-if="showResult">
          <div>
            <Image
              src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/265463153.jpg?k=6080ef1588adac18fd311c668d2af4de310a6e105361d00ceb5760c4654ba524&o=&hp=1"
              alt="Image"
              preview
            />
          </div>
          <div class="col-span-2 row-span-2">
            <Image
              src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/283183777.jpg?k=899b1542446c88268f790cf9968ddeffe42a7b24c7b228069de09413d5275822&o=&hp=1"
              alt="Image"
              preview
            />
          </div>
          <div>
            <Image
              src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/63266574.jpg?k=9db99772b7f6e8e2138a67c52f52d021879186f59227daca3dc1990142732cde&o=&hp=1"
              alt="Image"
              preview
            />
          </div>
          <div>
            <Image
              src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/243701987.jpg?k=a1014b2e0958950df45654178986335f7c3a25b56df6c0fb5593ee186e7a2699&o=&hp=1"
              alt="Image"
              preview
            />
          </div>
          <div>
            <Image
              src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/236933092.jpg?k=a4ff80f6d6f9a94f34f60bce0de48c582153bd38eac15590037c5043a3a48c6c&o=&hp=1"
              alt="Image"
              preview
            />
          </div>
        </div>
        <div class="p-4 justify-center flex mt-16" v-if="!showResult">
          <h2 class="text-3xl text-red-800 font-bold">404 no hotel found!</h2>
        </div>
      </div>
    </div>
    <!-- end head -->
    <!-- start-content  -->
    <div class="flex space-x-4 mt-5 mb-5" v-if="showResult">
      <div class="w-3/4 flex-col px-3">
        <div class="desc">
          {{ hotel.desc }}
        </div>
      </div>
      <div class="w-1/4 flex-col px-3">
        <div class="highlights bg-cyan-100 p-4 space-y-1">
          <h1 class="text-slate-900 font-bold">Property highlights</h1>
          <p class="text-slate-900 font-bold text-sm">Breakfast info</p>
          <p class="text-xs">Continental, Buffet</p>
          <p class="text-xs items-center">
            <span
              class="px-2 bg-slate-900 text-white mr-1 font-bold text-xl leading-10"
              >P</span
            >Free private parking available at the hotel
          </p>
        </div>
      </div>
    </div>
    <!-- end content  -->
    <!-- start rooms and price -->
    <DataTable :value="rooms" responsiveLayout="scroll">
      <template #empty> No room available. </template>
      <Column field="title" header="Room">
        <template #body="{ data }">
          <div class="flex-col">
            <h2 class="text-lg font-semibold">{{ data.title }}</h2>
            {{ data.desc }}
          </div>
        </template>
      </Column>
      <Column field="price" header="Price">
        <template #body="{ data }"> ${{ data.price }} </template>
      </Column>
      <Column field="maxPeople" header="Max People"></Column>
      <Column header="Select Rooms">
        <template #body="{ data }">
          <div class="flex space-x-3">
            <template v-for="room in data.roomNumbers" :key="room._id">
              <div class="flex-col justify-items-center room-checkbox">
                <p class="text-sm">{{ room.number }}</p>
                <input
                  type="checkbox"
                  value="{{room._id}}"
                  @change="setRoom(room._id)"
                  :disabled="!isAvailable(room)"
                />
              </div>
            </template>
          </div>
        </template>
      </Column>
      <Column header="Action">
        <template #body="{ data }">
          <div class="flex space-x-3">
            <Button
              class="p-button-primary primary-btn py-3 px-12"
              @click="reserve(data._id)"
              label="Reserve Now"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <Toast />
    <!-- start-footer  -->
  </div>
</template>
<script>
import axios from 'axios'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dropdown from 'primevue/dropdown'
import Image from 'primevue/image'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Slider from 'primevue/slider'
import Toast from 'primevue/toast'
import store from '../../store'
export default {
  components: {
    DataTable,
    Column,
    Image,
    Button,
    Slider,
    Card,
    InputNumber,
    InputText,
    Dropdown,
    Calendar,
    Toast,
  },
  data() {
    return {
      hotel: [],
      rooms: [],
      selectedRooms: [],
      destination: null,
      dummyDates: null,
      minAndMax: [50, 120],
      dates: null,
      showResult: false,
    }
  },
  methods: {
    isAvailable(room) {
      const allDates = this.getDateinRange(
        store.state.selectedDates[0],
        store.state.selectedDates[1]
      )
      const isFound = room.unAvailableDates.some((date) =>
        allDates.includes(new Date(date).getTime())
      )

      return !isFound
    },

    getDateinRange(startDate, endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const date = new Date(start.getTime())
      const dates = []

      while (date <= end) {
        dates.push(new Date(date).getTime())
        date.setDate(date.getDate() + 1)
      }
      return dates
    },
    onSelectDate() {
      const calendar = this.$refs.dateSelect ?? null
      if (
        calendar &&
        Array.isArray(calendar.modelValue) &&
        calendar.modelValue.length >= 2
      ) {
        calendar.overlayVisible = false
        store.commit('setDates', this.dates)
        this.getHotel()
      }
    },
    setRoom(id) {
      this.selectedRooms.includes(id)
        ? this.selectedRooms.splice(this.selectedRooms.indexOf(id), 1)
        : this.selectedRooms.push(id)
    },
    async reserve(id) {
      if (!this.$store.state.authenticated) {
        this.$store.commit('setdisplaySignInModal', true)
        return
      }
      if (!this.dates) {
        document.getElementById('checkin').focus()
      }
      if (this.selectedRooms.length === 0) {
        this.$toast.add({
          severity: 'info',
          summary: 'Information Message',
          detail: 'Please select at least one room',
          life: 3000,
        })
        return
      }
      try {
        this.selectedRooms.map((room) => {
          axios.put(store.state.site_url + '/api/rooms/reserve/' + room, {
            dates: this.dates,
          })
        })
        this.$toast.add({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Reservation successful!',
          life: 3000,
        })
        setTimeout(() => {
          this.$router.push('/')
        }, 2000)
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Something went wrong!',
          life: 3000,
        })
      }
    },
    search() {
      if (this.destination || this.minAndMax) {
        let minprice = this.minAndMax[0]
        let maxprice = this.minAndMax[1]
        this.$router.push({
          name: 'FHotels',
          query: {
            city: this.destination,
            checkin: this.checkInDate,
            checkout: this.checkOutDate,
            minprice: minprice,
            maxprice: maxprice,
          },
        })
      }
    },
    async getHotel() {
      await axios
        .get(store.state.site_url + '/api/hotels/' + this.$route.params.id)
        .then((response) => {
          this.hotel = response.data.hotel
          this.rooms = response.data.rooms
          this.showResult = true
        })
        .catch((error) => {
          console.log(error)
          this.showResult = false
        })
    },
  },
  created() {
    this.getHotel()
    if (store.state.selectedDates) {
      this.dates = store.state.selectedDates
    } else {
      let today = new Date()
      let dummyDate = new Date()
      dummyDate.setDate(today.getDate() + 1)
      this.dates = [dummyDate, today]
      store.commit('setDates', [today, dummyDate])
    }
  },
  mounted() {},
  watch: {},
}
</script>
