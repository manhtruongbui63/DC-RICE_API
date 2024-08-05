import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '@/utils/ApiError'

const register = async (req, res, next) => {
  const correctCondition = Joi.object({
    first_name: Joi.string().allow('', null).min(3).max(32).trim().strict().optional(),
    last_name: Joi.string().allow('', null).min(3).max(32).trim().strict().optional(),
    avatar: Joi.string().allow('', null).trim().strict().optional(),
    phone: Joi.string()
      .allow('', null)
      .pattern(/^[0-9]{10,11}$/)
      .optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).trim().strict().required(),
    password_cf: Joi.string().valid(Joi.ref('password')).trim().strict().required().messages({
      'any.only': 'Confirm password must match password'
    })
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
const login = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).trim().strict().required()
  })
  try {
    
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
export const authValidation = {
  register,
  login
}
