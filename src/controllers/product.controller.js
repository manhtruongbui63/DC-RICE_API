import { StatusCodes } from 'http-status-codes'
import productService from '@/services/product.service'

const createNew = async (req, res, next) => {
  try {
    let fakeVariants = [
      {
        title: 'Variant_1',
        compare_at_price: 300,
        price: 199,
        weight: 3,
        weight_unit: 'kg',
        inventory_quantity: 99
      },
      {
        title: 'Variant_2',
        compare_at_price: 400,
        price: 399,
        weight: 5,
        weight_unit: 'kg',
        inventory_quantity: 99
      },
      {
        title: 'Variant_3',
        compare_at_price: 800,
        price: 699,
        weight: 10,
        weight_unit: 'kg',
        inventory_quantity: 50
      },
      {
        title: 'Variant_4',
        compare_at_price: null,
        price: 1200,
        weight: 25,
        weight_unit: 'kg',
        inventory_quantity: 1
      }
    ]
    let payload = {
      pData: req.body,
      vData: fakeVariants
    }
    let data = await productService.createNew(payload)
    res.status(StatusCodes.CREATED).json({
      data: data ?? {}
    })
  } catch (error) {
    next(error)
  }
}

const getDetials = async (req, res, next) => {
  try {
    const { id } = req.params
    let data = await productService.getDetials(+id)
    res.status(StatusCodes.OK).json({
      data: data ?? {}
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createNew,
  getDetials
}
