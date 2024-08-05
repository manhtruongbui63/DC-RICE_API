import express from 'express'
import { productRoutes } from './product.routes'
import { userRoutes } from './user.routes'
import { postRoutes } from './post.routes'

const Router = express.Router()

Router.use('/users', userRoutes)
Router.use('/products', productRoutes)
Router.use('/posts', postRoutes)

Router.get('/', (req, res) => {
  return res.send('Wellcome!')
})

export const API_v1 = Router
