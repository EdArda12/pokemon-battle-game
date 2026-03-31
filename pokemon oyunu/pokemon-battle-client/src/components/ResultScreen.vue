<template>
  <div class="result-wrapper">
    <div class="result-screen">
      <h2>{{ resultText }}</h2>

      <div class="buttons">
        <button @click="playAgain">Yeniden Oyna</button>
        <button @click="chooseNew">Yeni Pokémon Seç</button>
        <router-link to="/history">
          <button class="history-button">Geçmiş Savaşlar</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemonStore'

const route = useRoute()
const router = useRouter()
const store = usePokemonStore()

const winner = route.query.winner
const resultText = winner === store.selectedPlayer.name ? 'You Win!' : 'You Lose!'

function playAgain() {
  router.push('/battle')
}

function chooseNew() {
  router.push('/select')
}
</script>

<style scoped>
.result-wrapper {
  position: fixed;
  inset: 0;
  background: url('/pokemon-images/background.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.result-screen {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
}

.buttons {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

button {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button.history-button {
  background-color: #6c757d;
}
</style>
