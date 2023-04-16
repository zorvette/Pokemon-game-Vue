import { shallowMount, mount } from '@vue/test-utils'
import pokemonPages from '@/pages/pokemonPages'
import { mockPokemon } from '../mocks/pokemons.mock'

let wrapper

beforeEach(() => {
  wrapper = shallowMount( pokemonPages )
})

describe(' pokemonPages Component ', () => {

  test('debe hacer match con el snapshot', () => {
    expect( wrapper.html() ).toMatchSnapshot()
  })

  test('debe de llamar mixPokemonArray al montar', () => {

    const mixPokemonArraySpy = jest.spyOn( pokemonPages.methods, 'mixPokemonArray' )
    const wrapper = shallowMount( pokemonPages )
    expect( mixPokemonArraySpy ).toHaveBeenCalled()

  })

  test('debe hacer match con el snapshot cuando carguen los pokemons', () => {
    const wrapper = shallowMount( pokemonPages, {
      data() {
        return {
          pokemonArr: mockPokemon,
          pokemon: mockPokemon[0],
          showPokemon: false,
          showAnswer: false,
          message: ""
        }
      }
    } )
    expect( wrapper.html() ).toMatchSnapshot()
  })

  test('debe de mostrar los componentes de pokemonPicture y pokemonOptions', () => {

    const wrapper = shallowMount( pokemonPages, {
      data() {
        return {
          pokemonArr: mockPokemon,
          pokemon: mockPokemon[0],
          showPokemon: false,
          showAnswer: false,
          message: ""
        }
      }
    } )

    const picture = wrapper.find('pokemon-picture-stub')
    const options = wrapper.find('pokemon-options-stub')

    expect(picture.exists()).toBe(true)
    expect(options.exists()).toBe(true)

    expect(picture.attributes('pokemonid')).toBe('1')
    expect(options.attributes('pokemons')).toBeTruthy()
  })

  test('pruebas con checkAnswer', async() => {

    const wrapper = shallowMount( pokemonPages, {
      data() {
        return {
          pokemonArr: mockPokemon,
          pokemon: mockPokemon[0],
          showPokemon: false,
          showAnswer: false,
          message: ""
        }
      }
    } )
    await wrapper.vm.checkAnswer(1)
    
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect( wrapper.vm.showPokemon ).toBeTruthy()
    expect(wrapper.find('h2').text()).toBe(`Correcto, ${mockPokemon[0].name}`)
    
    await wrapper.vm.checkAnswer(10)
    
    expect(wrapper.vm.message).toBe(`Oops, era ${mockPokemon[0].name}`)

  })

})