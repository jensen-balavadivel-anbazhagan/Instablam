<template>
<div>
  <header>
    <span class="logo">Instablam</span>
     <a id="gallery" @click="gallery">Gallery</a>
  </header>
 
  </div>
</template>

<script>
export default {
    methods: {
       gallery: function () {
      this.$router.push("/gallery");
    },
    }
};
</script>

<style>
header {
  position: relative;
  background: #222;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 3rem;
  font-family: "Lobster", cursive;
  color: #efefef;
}
.logo {
   justify-content: center;
   align-items: center;
  width: 80%;
}
#gallery {
      justify-content: start;
      font-size: 1rem;
      border: none;
      padding: 0.6rem 2rem;
      height: 3rem;
      border-radius: 5px;
      text-decoration: none;
      color: #efefef;
      cursor: pointer;
    }
</style>