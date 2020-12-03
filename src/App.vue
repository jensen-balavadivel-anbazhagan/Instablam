<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
 @import url('https://fonts.googleapis.com/css?family=Roboto');

* {
  padding: 0rem;
  margin: 0rem;
  box-sizing: border-box;
  outline: none;
}

#app {
 font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(0, 0, 0);
  width: 100%;

  #cta {
    width: 3.4rem;
    height: 3.4rem;
    background: #efefef;
    border-radius: 1rem;
  }
   a {
    color: #0094FF;
    text-decoration: none;
  }
  a:hover { color: #0074C6; }
}
</style>
