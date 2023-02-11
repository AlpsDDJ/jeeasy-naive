<script setup lang="ts" name="App">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  // import NaiveProvider from './components/NaiveProvider/index.vue'
</script>

<template>
  <naive-provider>
    <router-view />
  </naive-provider>
</template>

<style>
  #app {
    color: #2c3e50;
    margin-top: 60px;
    text-align: center;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
</style>
