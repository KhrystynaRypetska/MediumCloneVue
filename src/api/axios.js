import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'

// axios.defaults.baseURL = 'https://conduit.productionready.io/api'

// axios.defaults.baseURL = 'http://localhost:3000/api'

axios.defaults.baseURL =
  'https://private-anon-52eab1b1a0-goquotes.apiary-proxy.com/api/v1/all'

axios.interceptors.request.use((config) => {
  const token = getItem('accessToken')
  const authorizationToken = token ? `Token ${token}` : ''
  config.headers.Authorization = authorizationToken
  return config
})

export default axios
