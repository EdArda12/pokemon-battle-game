<template>
  <RouterView />
  <audio ref="bgm" src="/sounds/background.mp3" autoplay loop></audio>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const bgm = ref(null)

onMounted(() => {
  // Kullanıcı etkileşimi olmadan bazı tarayıcılarda çalmaz
  document.body.addEventListener(
    'click',
    () => {
      bgm.value.play().catch(() => {})
    },
    { once: true }
  )
})
</script>

<style>
/* Gerekirse genel stiller buraya yazılabilir */
</style>
