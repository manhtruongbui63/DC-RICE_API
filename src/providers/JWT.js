import JWT from 'jsonwebtoken'
import { env } from '@/configs/evironment'

const generateToken = async (info, key, time) => {
  const iss = env.ISS
  const exp = { algorithm: 'HS256', expiresIn: time }
  try {
    return JWT.sign({ ...info, iss: iss }, key, exp)
  } catch (error) {
    throw new Error(error)
  }
}
const verifyToken = (token, key) => {
  try {
    return JWT.verify(token, key)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  generateToken,
  verifyToken
}
