import axios from 'axios'

/**
 * Endpoint 1: https://pokeapi.co/api/v2/pokemon?limit=151
 * Endpoint 2: https://pokeapi.co/api/v2/type
 */
const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: { Accept: 'application/json' },
})

export default pokeApi
