<template>
  <div class="main">
    <NavBar></NavBar>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar';

export default {
  name : 'about',
  components:{
    NavBar
  }
}
</script>

<style>

</style>