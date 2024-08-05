/* eslint-disable no-useless-catch */
import db from '../models/index'
import ApiError from '@/utils/ApiError'
import { slugify, generateSKU } from '@/utils/formaters'
import { StatusCodes } from 'http-status-codes'

const createNew = async (data) => {
  try {
    const slug = slugify(data.pData?.name)
    const [product, created] = await db.Product.findOrCreate({
      where: { slug: slug },
      defaults: { ...data.pData, slug: slug }
    })
    if (!created) {
      throw new ApiError(StatusCodes.CONFLICT, 'The product already exists')
    }

    const variants = await Promise.all(
      data?.vData?.map(async (item, index) => {
        const sku = await signSKU()
        return {
          productId: +product.id,
          sku: sku,
          position: index + 1,
          ...item,
          presentmentPrices: [
            {
              price: {
                amount: item.price,
                currency_code: 'USD'
              },
              compareAtPrice: item.compareAtPrice
                ? { amount: item.compareAtPrice, currency_code: 'USD' }
                : null
            }
          ]
        }
      })
    )
    await db.Variant.bulkCreate(variants)
    return product
  } catch (error) {
    throw error
  }
}

const getDetials = async (id) => {
  try {
    const product = await db.Product.findOne({
      where: { id: id },
      include: [
        {
          model: db.Variant,
          as: 'variants',
          attributes: {
            exclude: []
          },
          required: false
        }
      ],
      nest: true
    })
    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'The product already exists')
    }
    return product
  } catch (error) {
    throw error
  }
}

const signSKU = async () => {
  let sku = generateSKU()
  let exitsSKU = await db.Variant.findOne({ where: { sku: sku } })
  while (exitsSKU) {
    sku = generateSKU()
    exitsSKU = await db.Variant.findOne({ where: { sku: sku } })
  }
  return sku
}

module.exports = {
  createNew,
  getDetials
}
