import express from 'express'
import { productRoutes } from './product.routes'

const Router = express.Router()

Router.use('/products', productRoutes)

Router.get('/', (req, res) => {
  return res.send('Wellcome!')
})

export const API_v1 = Router
