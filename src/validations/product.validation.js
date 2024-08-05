import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '@/utils/ApiError'

const product = {
  name: Joi.string().required().min(6).max(100).trim().strict().message({}),
  description: Joi.string().optional().min(100).trim().strict().message({}),
  thumbUrl: Joi.string().required().min(6).trim().strict().message({}),
  thumbAlt: Joi.string().optional().min(6).trim().strict().message({}),
  status: Joi.string()
    .valid('active', 'pending', 'inactive')
    .default('pending')
    .min(6)
    .trim()
    .strict()
    .message({})
}
const image = {
  productId: Joi.number().integer().required(),
  url: Joi.string().required().min(6).trim().strict().message({}),
  alt: Joi.string().optional().min(6).trim().strict().message({}),
  status: Joi.string()
    .valid('active', 'pending', 'inactive')
    .default('active')
    .min(6)
    .trim()
    .strict()
    .message({})
}
const variant = {
  productId: Joi.number().integer().required(),
  name: Joi.string().required().min(6).max(100).trim().strict(),
  position: Joi.number().integer().required(),
  compareAtPrice: Joi.number().precision(2).optional(),
  price: Joi.number().precision(2).required(),
  weight: Joi.number().integer(),
  weightUnit: Joi.string().trim().strict(),
  quantity: Joi.number().integer().required(),
  presentmentPrices: Joi.object().optional(),
  status: Joi.string()
    .valid('active', 'pending', 'inactive')
    .default('active')
    .min(6)
    .trim()
    .strict()
    .message({})
}
const attribute = {
  productId: Joi.number().integer().required(),
  k: Joi.string().required().trim().strict().message({}),
  v: Joi.string().required().trim().strict().message({}),
  status: Joi.string()
    .valid('active', 'pending', 'inactive')
    .default('active')
    .min(6)
    .trim()
    .strict()
    .message({})
}
const createProduct = async (req, res, next) => {
  const correctCondition = Joi.object({
    ...product,
    categories: Joi.array()
      .items(
        Joi.object({
          productId: Joi.number().integer().required().message({}),
          categoryId: Joi.number().integer().required().message({})
        })
      )
      .required(),
    images: Joi.array().items(Joi.object(image)).optional(),
    attributes: Joi.array().items(Joi.object(attribute)).optional(),
    variants: Joi.array().items(Joi.object(variant)).optional()
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
const createVariant = async (req, res, next) => {
  const correctCondition = Joi.object(variant)
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
const createAttribute = async (req, res, next) => {
  const correctCondition = Joi.object(attribute)
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
const createImage = async (req, res, next) => {
  const correctCondition = Joi.object(image)
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
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
    // next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: new Error(error).message })
  }
}
export const productValidation = {
  createProduct,
  createVariant,
  createAttribute,
  createImage,
  createNew
}
