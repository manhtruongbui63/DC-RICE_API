import { env } from '@/configs/evironment'

export const WHITELIST_DOMAINS = [
  'http://localhost:8080',
  env.FRONT_END_URL,
  'http://192.168.1.84:8080',
  'http://192.168.1.83:8080'
]
export const LIST_METHODS = ['GET', 'POST', 'PUT', 'DELETE']
