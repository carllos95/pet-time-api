import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'apipettime'

const prisma = new PrismaClient()

export class UserLogin {
  async userExists(email) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return userAlreadyExists
  }

  async passwordCompare(userData) {
    const { email, password } = userData
    const findUser = await prisma.user.findUnique({
      where: {
        email
      }
    })
    const isMatch = await bcrypt.compare(password, findUser.password)

    return isMatch
  }

  async genarateLoginToken(userData) {
    const { email, } = userData
    const findUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    const token = jwt.sign({ userId: findUser.id }, JWT_SECRET, { expiresIn: '1h' })

    return token
  }
}
