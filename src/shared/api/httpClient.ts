import axios from 'axios'

const BASE_URL = process.env.NEXT_API_BASE_URL
const PRODUCTION_URL = 'https://imymemine.kr/server'
export const httpClient = axios.create({
  baseURL: BASE_URL ?? '',
})

export const serverClient = axios.create({
  baseURL: PRODUCTION_URL ?? '',
})
