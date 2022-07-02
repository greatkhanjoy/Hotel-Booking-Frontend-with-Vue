<template>
  <Galleria
    :value="images"
    :numVisible="5"
    :circular="true"
    style="max-width: 800px"
    :showThumbnails="false"
    :autoPlay="true"
    :transitionInterval="4000"
  >
    <template #item="slotProps">
      <img
        :src="slotProps.item.itemImageSrc"
        :alt="slotProps.item.alt"
        style="width: 100%; display: block; max-height: 600px"
      />
    </template>
    <template #thumbnail="slotProps">
      <img
        :src="slotProps.item.thumbnailImageSrc"
        :alt="slotProps.item.alt"
        style="display: block"
      />
    </template>
  </Galleria>
</template>

<script>
import Galleria from 'primevue/galleria'
export default {
  name: 'Slider',
  components: {
    Galleria,
  },
  data() {
    return {
      images: [
        {
          itemImageSrc:
            'https://preview.colorlib.com/theme/hotell/images/ximg_1.jpg.pagespeed.ic.HbEqGs_pAR.webp',
          alt: 'Description for Image 1',
          title: 'Title 1',
        },
        {
          itemImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria2.jpg',
          thumbnailImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria2s.jpg',
          alt: 'Description for Image 2',
          title: 'Title 2',
        },
        {
          itemImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria3.jpg',
          thumbnailImageSrc: 'demo/images/galleria/galleria3s.jpg',
          alt: 'Description for Image 3',
          title: 'Title 3',
        },
        {
          itemImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria4.jpg',
          thumbnailImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria4s.jpg',
          alt: 'Description for Image 4',
          title: 'Title 4',
        },
        {
          itemImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria5.jpg',
          thumbnailImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria5s.jpg',
          alt: 'Description for Image 5',
          title: 'Title 5',
        },
        {
          itemImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria6.jpg',
          thumbnailImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria6s.jpg',
          alt: 'Description for Image 6',
          title: 'Title 6',
        },
        {
          itemImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria7.jpg',
          thumbnailImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria7s.jpg',
          alt: 'Description for Image 7',
          title: 'Title 7',
        },
        {
          itemImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria8.jpg',
          thumbnailImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria8s.jpg',
          alt: 'Description for Image 8',
          title: 'Title 8',
        },
        {
          itemImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria9.jpg',
          thumbnailImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria9s.jpg',
          alt: 'Description for Image 9',
          title: 'Title 9',
        },
        {
          itemImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria10.jpg',
          thumbnailImageSrc:
            'https://www.primefaces.org/primevue/demo/images/galleria/galleria10s.jpg',
          alt: 'Description for Image 10',
          title: 'Title 10',
        },
      ],
    }
  },
}
</script>
