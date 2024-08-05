/* eslint-disable no-useless-catch */
import db from '../models/index'
import bcrypt from 'bcrypt'
import _ from 'lodash'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { generateToken } from '@/providers/JWT'
import { env } from '@/configs/evironment'
import crypto from 'crypto'

const hanleRegister = async (data) => {
  try {
    const userExit = await db.User.findOne({ where: { email: data.email } })
    let phoneExit
    if (data.phone) {
      phoneExit = await db.User.findOne({ where: { phone: data.phone } })
    }
    if (userExit || phoneExit) {
      throw new ApiError(StatusCodes.CONFLICT, 'The email or phone number already exists')
    }
    const formData = _.set(data, 'password', hashPassword(data.password))
    const newUser = await db.User.create(formData)
    const role = await db.Role.findOne({ where: { code: 'CUS' } })
    if (!role) {
      throw new ApiError(StatusCodes.CONFLICT, 'The role user already exists')
    }
    await db.User_Role.bulkCreate([
      {
        user_id: +newUser?.id,
        role_id: +role?.id
      }
    ])
  } catch (error) {
    throw error
  }
}
const hanleLogin = async (data) => {
  try {

    const user = await db.User.findOne({
      where: { email: data.email },
      include: [
        {
          model: db.Role,
          attributes: ['name'],
          through: { attributes: [] }
        }
      ]
    })

    const isCheckPass = await checkPassword(data.password, user?.password)
    if (!user || !isCheckPass) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Email or password is incorrect')
    }
    const info = {
      id: user.id,
      username: `${user.first_name} ${user.last_name}`,
      role: user?.Roles[0]?.name
    }
    const accessToken = await generateToken(info, env.ACCESS_TOKEN_SECRET, env.ACCESS_EXPIRES_IN)
    const refreshToken = await generateToken(info, env.REFRESH_TOKEN_SECRET, env.REFRESH_EXPIRES_IN)
    return { user: info, accessToken, refreshToken }
  } catch (error) {
    console.log(error);

    throw error
  }
}
const hanleLogout = (data) => { }
const hashPassword = (password) => {
  try {
    let newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    if (!newPassword || newPassword === null) {
      return false
    }
    return newPassword
  } catch (error) {
    return false
  }
}
const checkPassword = (input, hash_password) => {
  try {
    let isCheck = bcrypt.compareSync(input, hash_password)
    if (!isCheck || isCheck === null) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}
const getProfile = async (id) => {
  try {
    const user = await db.User.findOne({
      where: { id: id },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: db.Role,
          attributes: ['name'],
          through: { attributes: [] }
        }
      ]
    })
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }
    return user
  } catch (error) {
    throw error
  }
}

module.exports = { hanleLogin, hanleRegister, hanleLogout, getProfile }
