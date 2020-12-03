<template>
  <div class="filtering">
    <Header />
    <section class="img-container">
      <canvas id="img"></canvas>
      <div class="info">
       <div style="color: rgb(240, 229, 215);"> <b>Location : </b> <p v-if="this.location"> {{ this.location }}</p>  </div>
        <div style="color: rgb(240, 229, 215);">  <b>Time :  </b><p v-if="this.time">{{ this.time }}</p>  </div>
      </div>
         </section>

    <footer class="filter-footer">
      <button id="back" @click="backToCamera">Back</button>
      <a id="download" @click="download">Download</a>
     
    </footer>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  components: {
    Header,
  },
  data: () => {
    return {
      imageloaded: false,
      imageURL: "",
      downloadLink: "",
      capturedImage: {
        id: "",
        title: "",
      },
    };
  },
  mounted() {
    this.getImage();
  },
  computed: {
     location(){
      return this.$store.state.imageLoc;
    },
    time() {
       const date = new Date();
      return date.toLocaleString();
    }
  },
  methods: {
    getImage: function () {
      const pictureI = this.$store.state.picture;
      const url = URL.createObjectURL(pictureI);
      this.imageURL = url;
      const filename = this.$store.state.uploadFileName;
      this.capturedImage = {
        id: filename,
        filename: filename,
        location: this.$store.state.imageLoc,
        timeTaken: this.time,
      };
      this.addImage();
      this.Caman("#img", this.imageURL, function () {
        this.render();
      });
       
    },
    addImage: function () {
      this.$store.dispatch("addPhoto", this.capturedImage);
    },
     
    backToCamera: function () {
      this.$router.push("/");
    },
    download: function () {
      this.Caman("#img", function () {
        let a = document.createElement("a");
        a.href = this.toBase64();
        a.download = Date() + "_image.png";
        a.click();
      });

      new Notification("instablam", {
        body: "your image has been downloaded",
        icon: "../assets/notification_icon.png",
      });
    },
   
  },
};
</script>

<style lang="scss" scoped>
.filtering {
  width: 100vw;
  min-height: 100vh;
  background:  rgb(66, 65, 65);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;

  .filter-footer {
    position: relative;
    background: #000;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    min-height: 6rem;

    canvas {
      height: 10rem;
    }

    .info {
      color: rgb(240, 229, 215);
    display: inline-block;
    padding: 2rem;
    width: 20rem;
  }

    button,
    a {
      font-size: 0.8rem;
      border: none;
      padding: 0.6rem 2rem;
      border-radius: 5px;
      text-decoration: none;
    }

    #back {
      background: #222;
      color: #dfdfdf;
    }
    #download {
      background: #44af69;
      color: #efefef;
      cursor: pointer;
    }

    #gallery {
      background: #944a6f;
      color: #efefef;
      cursor: pointer;
    }
  }
}

@media only screen and (min-width: 361px) and (max-width: 768px) {
  .filtering {
    width: 768px;
    margin: 0 auto;
  }
}

@media only screen and (max-width: 360px) {
  .filtering {
    width: 360px;
    margin: 0 auto;
  }
}
</style>