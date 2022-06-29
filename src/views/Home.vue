<template>
  <Hero />
  <ProductList />
</template>
<script>
import Hero from '../components/Hero.vue'
import ProductList from '../components/ProductList.vue'
export default {
  name: 'Home',
  components: {
    Hero,
    ProductList,
  },
}
</script>
