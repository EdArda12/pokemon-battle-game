<template>
  <div class="battle-wrapper">
    <div class="battle-screen">
      <h2>Savaş Başladı!</h2>

      <div class="battle-area">
        <!-- Oyuncu Pokémon -->
        <div class="pokemon">
          <img :src="player?.image" :alt="player?.name" />
          <p>{{ player?.name }}</p>
          <div class="hp-bar">
            <div class="hp-fill" :style="{ width: playerHP + '%' }"></div>
          </div>
        </div>

        <!-- Rakip Pokémon -->
        <div class="pokemon">
          <img :src="opponent?.image" :alt="opponent?.name" />
          <p>{{ opponent?.name }}</p>
          <div class="hp-bar">
            <div class="hp-fill" :style="{ width: opponentHP + '%' }"></div>
          </div>
        </div>
      </div>

      <!-- Saldırı Kontrolleri -->
      <div class="controls">
        <button @click="attack(false)" :disabled="isAttacking">Normal Saldırı</button>
        <button
          @click="attack(true)"
          :disabled="cooldown > 0 || isAttacking"
          class="special"
        >
          Özel Saldırı ({{ cooldown }} tur)
        </button>
      </div>

      <!-- Hasar Mesajları -->
      <ul class="log-list">
        <li v-for="(log, index) in logMessages" :key="index">{{ log }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemonStore'
import { postBattleLog } from '@/services/api'

const router = useRouter()
const store = usePokemonStore()
const player = store.selectedPlayer
const opponent = store.selectedOpponent

const playerHP = ref(100)
const opponentHP = ref(100)
const cooldown = ref(0)
const isAttacking = ref(false)
const turnCount = ref(0)
const logMessages = ref([])

const attackSound = new Audio('/sounds/attack.mp3')
function playAttackSound() {
  attackSound.currentTime = 0
  attackSound.play()
}

function calculateDamage(attacker, defender, isSpecial = false) {
  if (!attacker || !defender) return 0

  const multiplier = attacker.strongAgainst?.includes(defender.type)
    ? 2
    : attacker.weakAgainst?.includes(defender.type)
    ? 0.5
    : 1

  const power = isSpecial && attacker.abilities?.[0]
    ? attacker.abilities[0].power
    : attacker.basicAttack?.power || 0

  return Math.floor(power * multiplier)
}

function checkWinner() {
  if (playerHP.value <= 0) return 'opponent'
  if (opponentHP.value <= 0) return 'player'
  return null
}

function endBattle(winnerKey) {
  const winnerName = winnerKey === 'player' ? player.name : opponent.name
  postBattleLog({
    player: player.name,
    playerHP: playerHP.value,
    opponent: opponent.name,
    opponentHP: opponentHP.value,
    winner: winnerKey,
    turns: turnCount.value
  })
  router.push(`/result?winner=${winnerName}`)
}

function attack(isSpecial) {
  if (isAttacking.value) return
  isAttacking.value = true
  playAttackSound()

  const damage = calculateDamage(player, opponent, isSpecial)
  opponentHP.value = Math.max(0, opponentHP.value - damage)

  const attackType = isSpecial ? 'Özel Saldırı' : 'Normal Saldırı'
  logMessages.value.push(`${player.name}, ${attackType} ile ${damage} hasar verdi!`)

  if (isSpecial) cooldown.value = 3

  const winner = checkWinner()
  turnCount.value++

  if (winner) {
    setTimeout(() => endBattle(winner), 1000)
  } else {
    setTimeout(() => {
      const useSpecial = cooldown.value === 0 && Math.random() < 0.5
      const counterDamage = calculateDamage(opponent, player, useSpecial)
      playerHP.value = Math.max(0, playerHP.value - counterDamage)

      const counterType = useSpecial ? 'Özel Saldırı' : 'Normal Saldırı'
      logMessages.value.push(`${opponent.name}, ${counterType} ile ${counterDamage} hasar verdi!`)

      cooldown.value = Math.max(0, cooldown.value - 1)

      const winnerAfterCounter = checkWinner()
      if (winnerAfterCounter) {
        setTimeout(() => endBattle(winnerAfterCounter), 1000)
      } else {
        isAttacking.value = false
      }
    }, 1000)
  }
}
</script>

<style scoped>
.battle-wrapper {
  position: fixed;
  inset: 0;
  background: url('/pokemon-images/background.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.battle-screen {
  text-align: center;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
}

.battle-area {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
}

.pokemon {
  text-align: center;
}
.pokemon img {
  width: 100px;
}
.hp-bar {
  width: 150px;
  height: 16px;
  background-color: #eee;
  border-radius: 8px;
  margin-top: 0.5rem;
  overflow: hidden;
}
.hp-fill {
  height: 100%;
  background-color: red;
  transition: width 0.3s ease;
}

.controls button {
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}
button.special {
  background-color: gold;
}

.log-list {
  margin-top: 1.5rem;
  max-height: 200px;
  overflow-y: auto;
  text-align: left;
  padding: 0 1rem;
  list-style: disc;
  color: #333;
}
</style>
