<template>
  <div id="app">
      <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css">
      <link rel="stylesheet" href="https://cdn.plyr.io/3.6.12/plyr.css" />
      <div id="wrapper">
        <router-view/>
      </div>
    <Footer></Footer>   
  </div>
</template>

<script>

import Footer from './components/Footer'
import Vue from 'vue'
import VuePlyr from 'vue-plyr'
//import 'vue-plyr/dist/vue-plyr.css'

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

html, body, #app{
  height: 100%;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#wrapper{
  flex: 1;
}

</style>
