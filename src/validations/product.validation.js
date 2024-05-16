import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '@/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().min(3).max(256).trim().strict().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowed to be empty',
      'string.min': 'Title min 3 chars',
      'string.max': 'Title max 50 chars',
      'string.trim': 'Title must bot have leadinf or trailing whitespace'
    }),
    description: Joi.string().allow(null, '').optional().min(10).max(256).trim().strict().messages({
      'string.min': 'Description min 3 chars',
      'string.max': 'Description max 50 chars',
      'string.trim': 'Description must bot have leadinf or trailing whitespace'
    }),
    img_src: Joi.string().required().max(256).trim().strict().messages({}),
    img_alt: Joi.string().allow(null, '').optional().min(3).max(256).trim().strict().messages({}),
    brand: Joi.string().allow(null, '').optional().min(3).max(256).trim().strict().messages({}),
    status: Joi.string()
      .valid('active', 'pending', 'inactive')
      .default('pending')
      .required()
      .trim()
      .strict()
      .messages({})
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
export const productValidation = { createNew }
