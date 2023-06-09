import { shallowMount } from '@vue/test-utils'
import pokemonOptions from '@/components/pokemonOptions'
import { mockPokemon } from '../mocks/pokemons.mock'

describe('pokemonOptions component', () => {

  let wrapper

  beforeEach(()=> {
    wrapper = shallowMount( pokemonOptions, {
      props: {
        pokemons: mockPokemon
      }
    } )
  })

  test('debe de hacer match con el snapshot', () => {

    expect(wrapper.html).toMatchSnapshot()

  })

  test('debe de mostrar las 4 opciones correctamente', () => {

    const list = wrapper.findAll('li')
    expect(list.length).toBe(4)
    
    expect(list[0].text()).toBe('bulbasaur')
    expect(list[1].text()).toBe('ivysaur')
    expect(list[2].text()).toBe('venusaur')
    expect(list[3].text()).toBe('charmander')

  })

  test('debe de emitir "section" con sus respectivos paramentros al hacer click', () => {

    const [ li1, li2, li3, li4 ] = wrapper.findAll('li')

    li1.trigger('click')
    li2.trigger('click')
    li3.trigger('click')
    li4.trigger('click')
    
    // console.log(wrapper.emitted('selection'))

    expect( wrapper.emitted('selection').length ).toBe(4)
    expect( wrapper.emitted('selection')[0] ).toEqual([1])
    expect( wrapper.emitted('selection')[1] ).toEqual([2])
    expect( wrapper.emitted('selection')[2] ).toEqual([3])
    expect( wrapper.emitted('selection')[3] ).toEqual([4])


  })


  

})