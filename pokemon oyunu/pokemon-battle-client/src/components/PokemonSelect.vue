<template>
  <div class="select-screen">
    <h2>Pokémon Seç</h2>
    <div v-if="pokemons.length === 0">Yükleniyor...</div>
    <ul v-else>
      <li v-for="pokemon in pokemons" :key="pokemon.id" @click="selectPokemon(pokemon)">
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllPokemons } from '@/services/api'
import { usePokemonStore } from '@/stores/pokemonStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const pokemonStore = usePokemonStore()
const pokemons = ref([])

onMounted(async () => {
  pokemons.value = await getAllPokemons()
})

function selectPokemon(pokemon) {
  pokemonStore.setSelectedPlayer(pokemon)

  // Oyuncudan farklı rastgele bir rakip seç
  const availableOpponents = pokemons.value.filter(p => p.id !== pokemon.id)
  const randomOpponent = availableOpponents[Math.floor(Math.random() * availableOpponents.length)]

  pokemonStore.setSelectedOpponent(randomOpponent)

  router.push('/battle')
}
</script>

<style scoped>
.select-screen {
  text-align: center;
  padding: 2rem;
  cursor: pointer;
}

.select-screen li:hover {
  color: #007bff;
}
</style>
