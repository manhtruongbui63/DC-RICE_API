import { env } from './evironment'
import { WHITELIST_DOMAINS, LIST_METHODS } from '@/utils/constants'

export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin && env.NODE_ENV === 'dev') {
      return callback(null, true)
    }
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }
    return callback('', false)
  },
  methods: LIST_METHODS,
  exposedHeaders: 'Authorization',
  optionsSuccessStatus: 200,
  credentials: true
}
