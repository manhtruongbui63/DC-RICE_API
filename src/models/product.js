'use strict'
const { Model } = require('sequelize')
import { ApiError } from '@/utils/ApiError'
const { StatusCodes } = require('http-status-codes')
const _ = require('lodash')
const Joi = require('joi')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Variant, { foreignKey: 'productId', as: 'variants' })
    }
  }

  const productSchema = Joi.object({
    name: Joi.string().required().min(3).max(256).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().allow(null, '').optional().min(10).max(256).trim().strict(),
    img_src: Joi.string().required().max(256).trim().strict(),
    img_alt: Joi.string().allow(null, '').optional().min(3).max(256).trim().strict(),
    brand: Joi.string().allow(null, '').optional().min(3).max(256).trim().strict(),
    status: Joi.string()
      .valid('active', 'pending', 'inactive')
      .default('pending')
      .required()
      .trim()
      .strict(),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(Date.now),
    deletedAt: Joi.date().timestamp('javascript').default(null)
  })

  Product.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.STRING,
      img_src: DataTypes.STRING,
      img_alt: DataTypes.STRING,
      brand: DataTypes.STRING,
      status: DataTypes.ENUM('active', 'pending', 'inactive')
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: 'Product',
      hooks: {
        beforeValidate: (product, options) => {
          const { error } = productSchema.validate(_.omit(product.toJSON(), 'id'), {
            abortEarly: false
          })
          if (error) {
            throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
          }
        }
      }
    }
  )
  return Product
}
