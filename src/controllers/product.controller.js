import { StatusCodes } from 'http-status-codes'
import productService from '@/services/product.service'

const createNew = async (req, res, next) => {
  try {
    // let formData = {
    //   categories: [],
    //   images: [],
    //   attributes: [],
    //   variants: [],
    //   markdown: ''
    // }
    // let fakeVariants = [
    //   {
    //     title: 'Variant_1',
    //     compareAtPrice: 300,
    //     price: 199,
    //     weight: 3,
    //     weightUnit: 'kg',
    //     quantity: 99
    //   },
    //   {
    //     title: 'Variant_2',
    //     compareAtPrice: 400,
    //     price: 399,
    //     weight: 5,
    //     weightUnit: 'kg',
    //     quantity: 99
    //   },
    //   {
    //     title: 'Variant_3',
    //     compareAtPrice: 800,
    //     price: 699,
    //     weight: 10,
    //     weightUnit: 'kg',
    //     quantity: 50
    //   },
    //   {
    //     title: 'Variant_4',
    //     compareAtPrice: null,
    //     price: 1200,
    //     weight: 25,
    //     weightUnit: 'kg',
    //     quantity: 1
    //   }
    // ]
    // let payload = {
    //   pData: req.body,
    //   vData: fakeVariants
    // }
    // let data = await productService.createNew(payload)
    res.status(StatusCodes.CREATED).json({
      message: 'Successfull',
      success: true
      // data: data ?? {}
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
