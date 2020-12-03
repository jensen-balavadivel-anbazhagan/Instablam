<template>
  <div class="gallery">
    <div class="gallery-panel"
         v-for="photo in photos"
         :key="photo.id">
      <router-link :to="`/photo/${photo.id}`">
        <img :src= photo.imageSrc>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
    };
  },
  computed: {
    photos(){
      return this.$store.state.photos;
    },
  },
  mounted() {
    this.$store.dispatch('getAllPhotos');
  },
  methods: {
  },
};
</script>

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 1rem;
    max-width: 80rem;
    margin: 5rem auto;
    padding: 0 5rem;
  }
  .gallery-panel img {
    width: 100%;
    height: 22vw;
    object-fit: cover;
    border-radius: 0.75rem;
  }

  @media only screen and (min-width: 361px) and (max-width: 768px) {
    .gallery {
    display: flex;
    flex-direction: column;
    max-width: 80rem;
    margin: 5rem auto;
    padding: 0 5rem;
  }
}

  @media only screen and (max-width: 360px) {
    .gallery {
    display: flex;
    flex-direction: column;
    max-width: 80rem;
    margin: 5rem auto;
    padding: 0 5rem;
  }
}
</style>