import { env } from '@/configs/evironment'

export const WHITELIST_DOMAINS = ['http://localhost:8080', env.FRONT_END_URL]
export const LIST_METHODS = ['GET', 'POST', 'PUT', 'DELETE']
