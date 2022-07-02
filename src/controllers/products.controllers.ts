import { Request, Response, NextFunction } from 'express'
import productModel from '../models/products.model'

const ProductModel = new productModel()

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.createProduct(req.body)
    res.json({
      data: { ...product },
      message: 'product created successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductModel.getAllProducts()
    res.json({
      data: { ...products },
      message: 'All products were retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getOneProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.getOneProduct(
      req.params.product_id as unknown as string
    )
    res.json({
      data: { ...product },
      meesage: 'product retrieved successfully '
    })
  } catch (error) {
    next(error)
  }
}

export const updateOneProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.updateOneProduct(req.body)
    res.json({
      data: { ...product },
      message: 'product updated successfully'
    })
  } catch (error) {
    next(error)
  }
}
export const deleteOneProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.deleteOneProduct(
      req.params.product_id as unknown as string
    )
    res.json({
      data: { ...product },
      message: 'product is deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
