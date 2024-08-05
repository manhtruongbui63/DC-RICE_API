import express from 'express'
import { authValidation } from '@/validations/auth.validation'
import { isAuthorized } from '@/middlewares/actionJWT'
import {
  login,
  register,
  logout,
  refreshToken,
  active,
  profile
} from '@/controllers/auth.controller'

const Router = express.Router()
Router.route('/login').post(authValidation.login, login)
Router.route('/active').post(active)
Router.route('/register').post(authValidation.register, register)
Router.route('/logout/:id').post(logout)
Router.route('/refresh-token').put(refreshToken)
Router.route('/profile').get(isAuthorized, profile)

export const userRoutes = Router
