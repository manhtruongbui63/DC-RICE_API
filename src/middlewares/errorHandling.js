import { StatusCodes } from 'http-status-codes'
import { env } from '@/configs/evironment'

export const errorHandling = (err, req, res) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack
  }
  if (env.MODE !== 'dev') delete responseError.stack
  res.status(responseError.statusCode).json(responseError)
}
