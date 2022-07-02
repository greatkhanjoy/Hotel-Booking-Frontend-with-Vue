<template>
  <div class="bg-white">
    <div
      class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h2 class="sr-only">Explore Bangladesh</h2>
      <h2 class="text-3xl py-5">Explore Bangladesh</h2>
      <div
        class="grid grid-cols-4 gap-y-5 sm:grid-cols-3 gap-x-3 lg:grid-cols-6 xl:grid-cols-4 xl:gap-x-8"
      >
        <a
          v-for="city in cities"
          :key="city.id"
          :href="'/hotels?city=' + city.name"
          class="group"
        >
          <div
            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              :src="city.imageSrc"
              :alt="city.imageAlt"
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">
            {{ city.name }}
          </h3>
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{ city.count }}
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const cities = [
  {
    id: 1,
    name: 'Mymensingh',
    href: '/hotels?city=Mymensingh',
    count: '10',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Mymensingh',
  },
  {
    id: 2,
    name: 'Sylhet',
    href: '#',
    count: '15',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Sylhet',
  },
  {
    id: 3,
    name: 'Rajshahi',
    href: '#',
    count: '20',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Rajshahi',
  },
  {
    id: 4,
    name: 'Dhaka',
    href: '#',
    count: '25',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Dhaka',
  },
  {
    id: 5,
    name: 'Chittagong',
    href: '#',
    count: '30',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-05.jpg',
    imageAlt: 'Chittagong',
  },
  {
    id: 6,
    name: 'Khulna',
    href: '#',
    count: '35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-06.jpg',
    imageAlt: 'Khulna',
  },
]
</script>
