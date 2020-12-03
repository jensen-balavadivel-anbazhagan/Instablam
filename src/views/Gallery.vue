<template>
 <div class="gallery-view">
  <header>
    <span class="logo">Instablam</span>
     <a id="home" @click="home">Home</a>
  </header>
  
   <div class="gallery">
    <Gallery />
   </div>
 </div>
</template>

<script>
import Gallery from '../components/Gallery.vue';

export default {
  components: {
    Gallery,
  },
  methods: {
       home: function () {
      this.$router.push("/");
    },
    }
};
</script>
<style lang="scss" scoped>
.gallery-view {
  width: 100vw;
  min-height: 100vh;
  background: rgb(66, 65, 65);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;

.logo {
  width: 80%;
}
  footer {
    position: relative;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 6rem;
  }
}
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 1rem;
    max-width: 80rem;
    margin: 5rem auto;
    padding: 0 5rem;
  }

  #home{
      justify-content: start;
      font-size: 1rem;
      border: none;
      padding: 0.6rem 2rem;
      height: 3rem;
      border-radius: 5px;
      text-decoration: none;
      color:  #0094FF;
      cursor: pointer;
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
