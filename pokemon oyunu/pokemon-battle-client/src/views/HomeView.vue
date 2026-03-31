<template>
  <div class="home-view">
    <h1>Hoş geldin Pokémon Savaşına!</h1>

    <RouterLink to="/select">Oyunu Başlat</RouterLink>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-view {
  text-align: center;
  margin-top: 2rem;
}
a {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border-radius: 8px;
  text-decoration: none;
}
</style>
