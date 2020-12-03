<template>
  <div class="home">
    <Header></Header>
    
    <video-stream />
    <footer>
     
      <button id="cta" @click="capturePic"></button>
      
    </footer>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import VideoStream from "../components/VideoStream.vue";
export default {
  components: {
    Header,
    VideoStream
  },
  mounted() {
    Notification.requestPermission();
     this.getLocation();
  },
  methods: {
    capturePic: async function() {
       const stream = this.$store.state.VideoStream;
      const videoTrack = await stream.getVideoTracks()[0];
      const captureImage = new ImageCapture(videoTrack);
      const picture = await captureImage.takePhoto();
      this.uploadImage(picture);  
    },
  
    gallery: function() {
      this.$router.push("/gallery");
    },
    uploadImage: function (data) {
       
       const formData = new FormData();
       formData.append('imageFile',data);
       const fileData = {
         picture: data,
         form: formData,
       }
           
      this.$store.dispatch("uploadImage", fileData);
    },
    getLocation: function () {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const coordinates = {
            latitude: latitude,
            longitude: longitude,
          };
          this.$store.dispatch("getLocation", coordinates);
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
 width: 100vw;
  min-height: 100vh;
  background: rgb(66, 65, 65);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;


  footer {
    position: relative;
    background: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 6rem;
  }
}
a {
      font-size: 0.8rem;
      border: none;
      padding: 0.6rem 2rem;
      border-radius: 5px;
      text-decoration: none;
      background: #944a6f;
      color: #efefef;
      cursor: pointer;
    }

@media only screen and (min-width: 361px) and (max-width: 768px) {
  .home {
    width: 768px;
    margin: 0 auto;
  }
}

@media only screen and (max-width: 360px) {
  .home {
    width: 360px;
    margin: 0 auto;
  }
}
</style>