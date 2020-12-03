<template>
  <div class="lightbox" @click.self="closeLightbox">
    <img :src=photo.imageSrc>
    <div class="lightbox-info">
      <div class="lightbox-info-inner">
      <div> <b>Location : </b> <p v-if="photo.location"> {{ photo.location }}</p>  </div>
        <div>  <b>Time :  </b><p v-if="photo.timeTaken">{{ photo.timeTaken }}</p>  </div>
        <div>  &nbsp;</div> 
        <footer class="button-footer">
      <a id="download" @click="download">Download</a>
       <a id="delete" @click="removePhoto">Delete</a>
    </footer>
        </div>
     
      
    </div>
  </div>
</template>

<script>

export default {
  name: 'Photo',
  data() {
    return {
    };
  },
  computed: {
     photos(){
      return this.$store.state.photos;
    },
    photo() {
      return this.photos.find((photo) => {
        return photo.id === this.$route.params.id;
      });
    },
  },
  methods: {
    
    closeLightbox() {
      this.$router.push('/gallery');
    },
    removePhoto: function () {
      var deletePhoto = {
         id: this.photo.id,
         filename: this.photo.filename,
         location: this.photo.location,
         timeTaken: this.photo.timeTaken
        };
      this.$store.dispatch("removePhoto", deletePhoto);
       this.$router.push('/gallery');
    },
     download: function () {
      
        let a = document.createElement("a");
        a.href = this.photo.imageSrc;
        a.download = this.photo.id;
        a.click();

      new Notification("instablam", {
        body: "your image has been downloaded",
        icon: "../assets/notification_icon.png",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }

  .lightbox img {
    margin: auto;
    width: 100%;
    grid-column-start: 2;
  }

  .lightbox-info {
    margin: auto 2rem auto 0;
  }

  .lightbox-info-inner {
    background-color: #FFFFFF;
    display: inline-block;
    padding: 2rem;
    width: 20rem;
  }

  .button-footer {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    min-height: 6rem;

    canvas {
      height: 10rem;
    }
    #download {
       font-size: 0.8rem;
      border: none;
      padding: 0.6rem 2rem;
      border-radius: 5px;
      text-decoration: none;
      background: #44af69;
      color: #efefef;
      cursor: pointer;
    }

    #delete {
       font-size: 0.8rem;
      border: none;
      padding: 0.6rem 2rem;
      border-radius: 5px;
      text-decoration: none;
      background: #a03c3c;
      color: #efefef;
      cursor: pointer;
    }
  }

  
</style>
