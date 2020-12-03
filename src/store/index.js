import Vue from 'vue'
import Vuex from 'vuex'
import http from "../store/http-common";
import axios from "axios";
import router from '../router/index.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    VideoStream: {},
    photos: {},
    image: {},
    imageLoc: "",
    picture: "",
    uploadFileName:"",
    imageFile: {}
  },
  mutations: {
    saveVideoStream(state, stream) {
      state.VideoStream = stream
    },
    showGallery(state, photos) {
      state.photos = photos
  },
  addPhoto(state, photo) {
    state.image = photo;
  },
  removePhoto(state, photo) {
    state.image = photo;
  },
  imageLocation(state, loc) {
    state.imageLoc = loc.city;
  },
  uploadImage(state,filename ) {
    state.uploadFileName = filename;
    router.push("/image");
  },
  getImage(state,file ) {
    console.log("file" + file);
    state.imageFile = file;
  } ,
  updatePic(state,picture ) {
    state.picture = picture;
  }     
  },
  actions: {
    getVideoStream(ctx, stream) {
      ctx.commit('saveVideoStream', stream)
    },
    async getAllPhotos(ctx) {
      http.get("/gallery").then(
        response => {
          ctx.commit('showGallery', response.data.data)
        }).catch(e => {
          console.log(e);
        });
    },
    async addPhoto(ctx, photo) {
      http.post("/gallery/add",photo).then(
        response => {
          ctx.commit("addPhoto", response.data.data);
        }).catch(e => {
          console.log(e);
        });
    },
    async removePhoto(ctx, photo) {
      http.post("/gallery/delete",photo).then(
        response => {
          ctx.commit("removePhoto", response.data.data);
        }).catch(e => {
          console.log(e);
        });
    },
    async uploadImage(ctx, uploadFile) {
      ctx.commit("updatePic", uploadFile.picture);
      http.post("/gallery/upload",uploadFile.form).then(
        response => {
          ctx.commit("uploadImage", response.data.fileName);
        }).catch(e => {
          console.log(e);
        });
        
    },
    async getLocation(ctx, coordinates) {
       axios.get(
            "https://geocode.xyz/" +
            coordinates.latitude +
            "," +
            coordinates.longitude +
            "?json=1"
         ).then(
          response => {
            ctx.commit("imageLocation", response.data);
          }).catch(e => {
            console.log(e);
          });
      
   }
  },
  modules: {},
})
