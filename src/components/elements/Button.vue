<template>
  <button
    v-if="type === 'default'"
    @click="$emit('click')"
    type="button"
    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    {{ title }}
  </button>
  <button
    v-if="type === 'primary'"
    @click="$emit('click')"
    type="button"
    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    {{ title }}
  </button>
  <button
    v-if="type === 'danger'"
    @click="$emit('click')"
    type="button"
    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    {{ title }}
  </button>
  <button
    v-if="type === 'success'"
    @click="$emit('click')"
    type="button"
    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#28a745] hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    {{ title }}
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: {
    title: {
      type: String,
      required: true,
      default: 'Button',
    },
    type: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {}
  },
}
</script>
