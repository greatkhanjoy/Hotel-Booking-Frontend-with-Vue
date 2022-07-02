<template>
  <div>
    <div class="card">
      <Carousel
        :value="products"
        :numVisible="3"
        :numScroll="3"
        :responsiveOptions="responsiveOptions"
      >
        <template #header>
          <h5>Basic</h5>
        </template>
        <template #item="slotProps">
          {{ slotProps }}
          <div class="product-item">
            <div class="product-item-content">
              <div class="mb-3">
                <img
                  src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                  :alt="slotProps.name"
                  class="product-image"
                />
              </div>
              <div>
                <h4 class="mb-1">{{ slotProps.name }}</h4>
                <h6 class="mt-0 mb-3">${{ slotProps.price }}</h6>
                <span
                  :class="
                    'product-badge status-' +
                    slotProps.inventoryStatus.toLowerCase()
                  "
                  >{{ slotProps.inventoryStatus }}</span
                >
                <div class="car-buttons mt-5">
                  <Button
                    icon="pi pi-search"
                    class="p-button p-button-rounded mr-2"
                  />
                  <Button
                    icon="pi pi-star-fill"
                    class="p-button-success p-button-rounded mr-2"
                  />
                  <Button
                    icon="pi pi-cog"
                    class="p-button-help p-button-rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
import Carousel from 'primevue/carousel'
export default {
  components: {
    Carousel,
  },
  data() {
    return {
      responsiveOptions: [
        {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3,
        },
        {
          breakpoint: '600px',
          numVisible: 2,
          numScroll: 2,
        },
        {
          breakpoint: '480px',
          numVisible: 1,
          numScroll: 1,
        },
      ],
    }
  },
  products: [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo - watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1001',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo - watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1002',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo - watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
  ],
  created() {},
  mounted() {},
}
</script>
