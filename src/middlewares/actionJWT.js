import { StatusCodes } from 'http-status-codes'
import { verifyToken } from '@/providers/JWT'
import { env } from '@/configs/evironment'
import db from '../models/index'

const isAuthorized = async (req, res, next) => {
  let token = req.headers['authorization']
  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized! (Token not found)' })
    return
  }
  try {
    token = token.split(' ')[1]
    const tokenDecoded = await verifyToken(token, env.ACCESS_TOKEN_SECRET)
    req.jwtDecoded = tokenDecoded
    next()
  } catch (error) {
    if (error.message?.includes('jwt expired')) {
      res.status(StatusCodes.GONE).json({ message: 'Need to refresh token' })
      return
    }
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized! Please login' })
  }
}

const isPermission = async (req, res, next) => {
  const { id, role } = req.jwtDecoded
  try {
    const user = await db.User.findone({
      where: { id: id },
      include: [
        {
          model: db.Role,
          attributes: ['name'],
          through: { attributes: [] }
        }
      ]
    })
    next()
  } catch (error) {
    // eslint-disable-next-line quotes
    res.status(StatusCodes.FORBIDDEN).json({ message: `Forbidden! (User don't have access)` })
  }
}

module.exports = { isAuthorized, isPermission }
