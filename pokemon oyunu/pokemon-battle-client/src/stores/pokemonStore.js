// pokemonStore.js
import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    selectedPlayer: null,
    selectedOpponent: null,
  }),
  actions: {
    setPlayer(pokemon) {
      this.selectedPlayer = pokemon
    },
    setOpponent(pokemon) {
      this.selectedOpponent = pokemon
    },
  },
})
