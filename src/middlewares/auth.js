import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { verifyToken } from '@/providers/JWT'

const isAuthorized = async (req, res, next) => {
  // const accessToken = req.cookies?.accessToken
  const accessToken = req.headers['authorization']?.split(' ')[1]
  if (!accessToken) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized (Token Not Found)')
  }
  try {
    req.decoded = await verifyToken(accessToken)
    next()
  } catch (error) {
    if (error.message?.includes('jwt expried')) {
      throw new ApiError(StatusCodes.GONE, 'Refresh Token')
    }
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized (Please Login)')
  }
}

module.exports = { isAuthorized }
