<template>
  <div id="app">
      <NavBar></NavBar>
      <router-view/>
    <Footer></Footer>   
  </div>
</template>

<script>

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Vue from 'vue'

import 'bulma/css/bulma.css'

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

Vue.use(VuePlyr)

export default {
  name: 'app',
  components: {
    NavBar,
    Footer
  }
}
</script>

<style>

html, body {
  height: 100%;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

</style>
