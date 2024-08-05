import express from 'express'
import { getAll } from '@/controllers/post.controller'

const Router = express.Router()
Router.route('/').get(getAll).post()
Router.route('/:id').get().put()

export const postRoutes = Router
