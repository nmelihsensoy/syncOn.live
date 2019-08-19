<template>
  <div id="app">
      <router-view/>
    <Footer></Footer>   
  </div>
</template>

<script>

import Footer from './components/Footer'
import Vue from 'vue'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import 'bulma/css/bulma.css'

Vue.use(VuePlyr)

export default {
  name: 'app',
  components: {
    Footer
  },
  data : function() {
      return{
          form_data : false
      }
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
