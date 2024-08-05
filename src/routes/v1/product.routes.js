import express from 'express'
import { productValidation } from '@/validations/product.validation'
import { createNew, getDetials } from '@/controllers/product.controller'
import { isAuthorized } from '@/middlewares/actionJWT'

const Router = express.Router()
Router.route('/').get().post(productValidation.createNew, createNew)
Router.route('/:id').get(getDetials).put()

export const productRoutes = Router
