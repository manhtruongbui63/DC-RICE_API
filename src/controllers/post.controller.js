import db from '../models/index'
import { StatusCodes } from 'http-status-codes'

const getAll = async (req, res, next) => {
  try {
    const data = await db.Post.findAll({})
    res
      .status(StatusCodes.OK)
      .json({ message: 'Get All Successfull!', success: true, data: data ?? [] })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  getAll
}
