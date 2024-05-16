'use strict'
const { Model } = require('sequelize')
const ApiError = require('@/utils/ApiError')
const { StatusCodes } = require('http-status-codes')
const _ = require('lodash')
const Joi = require('joi')
module.exports = (sequelize, DataTypes) => {
  class Variant extends Model {
    static associate(models) {
      Variant.belongsTo(models.Product, { foreignKey: 'productId', as: 'variants' })
    }
  }
  // const productSchema = Joi.object({
  //   name: Joi.string().required().min(3).max(256).trim().strict(),
  //   slug: Joi.string().required().min(3).trim().strict(),
  //   description: Joi.string()
  //     .allow(null, '')
  //     .optional()
  //     .min(10)
  //     .max(256)
  //     .trim()
  //     .strict(),
  //   img_src: Joi.string().required().max(256).trim().strict(),
  //   img_alt: Joi.string()
  //     .allow(null, '')
  //     .optional()
  //     .min(3)
  //     .max(256)
  //     .trim()
  //     .strict(),
  //   brand: Joi.string()
  //     .allow(null, '')
  //     .optional()
  //     .min(3)
  //     .max(256)
  //     .trim()
  //     .strict(),
  //   status: Joi.string()
  //     .valid('active', 'pending', 'inactive')
  //     .default('pending')
  //     .required()
  //     .trim()
  //     .strict(),
  //   createdAt: Joi.date().timestamp('javascript').default(Date.now),
  //   updatedAt: Joi.date().timestamp('javascript').default(Date.now),
  //   deletedAt: Joi.date().timestamp('javascript').default(null)
  // })

  Variant.init(
    {
      productId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      sku: DataTypes.STRING,
      position: DataTypes.INTEGER,
      compare_at_price: DataTypes.DECIMAL(10, 2),
      price: DataTypes.DECIMAL(10, 2),
      weight: DataTypes.INTEGER,
      weight_unit: DataTypes.STRING,
      inventory_quantity: DataTypes.INTEGER,
      presentment_prices: DataTypes.JSON
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: 'Variant',
      hooks: {
        // beforeValidate: (product, options) => {
        //   const { error } = productSchema.validate(
        //     _.omit(product.toJSON(), 'id'),
        //     {
        //       abortEarly: false
        //     }
        //   )
        //   if (error) {
        //     throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
        //   }
        // }
      }
    }
  )
  return Variant
}
