<template>
  <div class="wrapper">
    <div class="select-screen">
      <h1 v-if="!selectedPlayer">Bir Pokémon Seç</h1>
      <h1 v-else>Rakibin Pokémon'unu Seç</h1>
      <p v-if="!selectedPlayer">Savaşta kullanmak üzere Pokémon'unu seç!</p>
      <p v-else>Rakibin olarak kiminle savaşmak istersin?</p>

      <div class="pokemon-grid">
        <div
          class="pokemon-card"
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          @click="handleSelect(pokemon)"
          :class="{
            selected: selectedPlayer?.id === pokemon.id || selectedOpponent?.id === pokemon.id,
            disabled: selectedPlayer && pokemon.id === selectedPlayer.id
          }"
        >
          <img :src="`/pokemon-images/${pokemon.name.toLowerCase()}.png`" :alt="pokemon.name" />
          <h3>{{ pokemon.name }}</h3>
          <p>HP: 100</p>
        </div>
      </div>

      <button @click="startBattle" :disabled="!selectedPlayer || !selectedOpponent">
        Savaşa Başla
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllPokemons } from '@/services/api'
import { usePokemonStore } from '@/stores/pokemonStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = usePokemonStore()

const pokemons = ref([])
const selectedPlayer = ref(null)
const selectedOpponent = ref(null)

onMounted(async () => {
  pokemons.value = await getAllPokemons()
})

function handleSelect(pokemon) {
  if (!selectedPlayer.value) {
    selectedPlayer.value = pokemon
  } else if (pokemon.id !== selectedPlayer.value.id) {
    selectedOpponent.value = pokemon
  }
}

function startBattle() {
  if (selectedPlayer.value && selectedOpponent.value) {
    store.setPlayer(selectedPlayer.value)
    store.setOpponent(selectedOpponent.value)
    router.push('/battle')
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  position: fixed;
  inset: 0;
  background: url('/pokemon-images/background.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.select-screen {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 800px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #222;
}

p {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1.5rem;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  justify-items: center;
  align-items: center;
  margin-bottom: 2rem;
}

.pokemon-card {
  background-color: white;
  border-radius: 12px;
  padding: 1rem;
  width: 150px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pokemon-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
}

.pokemon-card.selected {
  border: 3px solid #007bff;
}

.pokemon-card.disabled {
  opacity: 0.4;
  pointer-events: none;
}

.pokemon-card img {
  width: 100px;
  height: auto;
  margin-bottom: 0.5rem;
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

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>
