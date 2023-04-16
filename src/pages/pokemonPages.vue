<template>

<h1 v-if="!pokemon" >Espere por favor...</h1>

  <div v-else>
  <h1>¿Quién es este pokémon?</h1>

  <pokemonPicture 
    :pokemonId="pokemon.id" 
    :showPokemon="showPokemon"
  />
  <pokemonOptions 
    :pokemons="pokemonArr"
    @selection="checkAnswer"
  /> 

    <div v-if="showAnswer">
      <h2 class="fade-in"> {{message}} </h2>
      <button @click="newGame" >
        Nuevo Juego
      </button>
    </div>
  </div>

</template>

<script>
import pokemonPicture from '@/components/pokemonPicture.vue'
import pokemonOptions from '@/components/pokemonOptions.vue'

import getPokemonOptions from '@/helpers/getPokemonOptions'

// console.log( getPokemonOptions() )

export default {
  components: { pokemonPicture, pokemonOptions },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ""
    }
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions()

      const rndInt = Math.floor( Math.random() * 4 )

    this.pokemon = this.pokemonArr[ rndInt ]
    },
    checkAnswer( selectedId ) {
      this.showPokemon = true
      this.showAnswer = true

      if( selectedId === this.pokemon.id ) {
        this.message = `Correcto, ${this.pokemon.name}`
      } else {
        this.message = `Oops, era ${this.pokemon.name}`
      }
    },
    newGame() {
      this.showPokemon = false
      this.showAnswer  = false
      this.pokemon     = null
      this.pokemonArr  = []
      this.mixPokemonArray()
    }
  },
  mounted() {
    this.mixPokemonArray()
  }
}
</script>
