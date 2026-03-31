<template>
  <div class="history-wrapper">
    <div class="history-screen">
      <h2>Geçmiş Savaşlar</h2>

      <ul v-if="reversedHistory.length" class="history-list">
        <li v-for="(battle, index) in reversedHistory" :key="index">
          {{ battle.player }} vs {{ battle.opponent }} → Kazanan: {{ battle.winner }} ({{ battle.turns }} tur)
        </li>
      </ul>

      <p v-else>Henüz hiç savaş yapılmamış.</p>

      <button @click="goBack">Geri Dön</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getBattleHistory } from '@/services/api'

const router = useRouter()
const battleHistory = ref([])

onMounted(async () => {
  battleHistory.value = await getBattleHistory()
})

const reversedHistory = computed(() => [...battleHistory.value].reverse())

function goBack() {
  router.push('/')
}
</script>

<style scoped>
.history-wrapper {
  position: fixed;
  inset: 0;
  background: url('/pokemon-images/background.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.history-screen {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
  max-height: 80vh;
  overflow-y: auto;
}

.history-list {
  text-align: left;
  margin-bottom: 2rem;
  padding-left: 1rem;
  color: #333;
  max-height: 50vh;
  overflow-y: auto;
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
</style>
