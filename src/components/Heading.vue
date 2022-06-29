<template>
  <div
    class="lg:flex lg:items-center lg:justify-between border-2 px-5 py-5 rounded-md"
  >
    <div class="flex-1 min-w-0">
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
      >
        {{ heading }}
      </h2>
      <div
        class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6"
      >
        <div class="mt-2 flex items-center text-sm text-gray-500">
          {{ description }}
        </div>
      </div>
    </div>
    <div class="mt-5 flex lg:mt-0 lg:ml-4" :class="classNames">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  },
  props: {
    classNames: {
      type: String,
      default: '',
    },
    heading: {
      type: String,
      required: true,
      default: 'Heading Here',
    },
    description: {
      type: String,
      required: true,
      default: 'Description Here',
    },
  },
  data() {
    return {}
  },
}
</script>
