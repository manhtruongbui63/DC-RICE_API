import { StatusCodes } from 'http-status-codes'
import ApiError from '@/utils/ApiError'
import authService from '@/services/auth.service'
import { env } from '@/configs/evironment'
import _ from 'lodash'

import { generateToken, verifyToken } from '@/providers/JWT'

const login = async (req, res, next) => {
  try {
    let data = await authService.hanleLogin(req.body)
    res.setHeader('Authorization', `Bearer ${data.accessToken}`)
    res.setHeader('X-Refresh-Token', data.refreshToken)
    res.status(StatusCodes.OK).json({
      message: 'Login successfull',
      success: true,
      data: data ?? {}
    })
  } catch (error) {
    next(error)
  }
}
const active = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({
      message: '',
      success: true
    })
  } catch (error) {
    next(error)
  }
}
const register = async (req, res, next) => {
  try {
    _.unset(req.body, 'password_cf')
    await authService.hanleRegister(req.body)
    res.status(StatusCodes.CREATED).json({
      message: 'Register successfull',
      success: true
    })
  } catch (error) {
    next(error)
  }
}
const logout = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({
      message: 'Logout successfull',
      success: true,
      data: {}
    })
  } catch (error) {
    next(error)
  }
}
const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body
  try {
    const refreshTokenDecoded = await verifyToken(refreshToken, env.REFRESH_TOKEN_SECRET)
    const info = {
      id: refreshTokenDecoded.id,
      username: refreshTokenDecoded.username,
      role: refreshTokenDecoded.role
    }
    const token = await generateToken(info, env.ACCESS_TOKEN_SECRET, env.ACCESS_EXPIRES_IN)
    res.status(StatusCodes.OK).json({
      message: 'Refresh Token successfull',
      success: true,
      token: token ?? ''
    })
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, new Error(error).message))
  }
}
const profile = async (req, res, next) => {
  const { id } = req.jwtDecoded
  try {
    const data = await authService.getProfile(+id)
    res.status(StatusCodes.OK).json({
      message: 'Get Profile successfull',
      success: true,
      data: data ?? {}
    })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  login,
  active,
  register,
  logout,
  refreshToken,
  profile
}
