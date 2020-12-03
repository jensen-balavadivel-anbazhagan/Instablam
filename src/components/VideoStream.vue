<template>
  <div class="wrapper">
    <p v-if="!videoOn">loading .........</p>
    <video v-if="videoOn" :src-object.prop.camel="videoStream" @loadedmetadata="play"></video>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      videoOn: false,
      videoStream: {}
    };
  },
  mounted() {
    this.getVideoStream();
  },
  methods: {
    getVideoStream: async function() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        this.videoStream = await stream;
        this.videoOn = true;
        this.$store.dispatch("getVideoStream", stream);
      } catch (err) {
        alert("Error getting camera stream \n" + err);
      }
    },
    play: function(e) {
      e.target.play();
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: rgba(7, 7, 7, 0.4);
  }

  video {
    max-width: 100%;
  }
}
</style>