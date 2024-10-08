import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserAuth {
  async hasToken(req) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    return token
  }

  async verifyToken(req) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const JWT_SECRET = 'apipettime'

    const verifiedJwt = jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) throw new Error("Token com informações faltando!");

      const findUser = await prisma.user.findUnique({
        where: {
          id: user.userId
        }
      })

      const { password, ...userWhitoutPassword } = findUser

      const userWithToken = {
        ...userWhitoutPassword,
        token
      }

      req.user = userWithToken
      return userWithToken
    })

    return verifiedJwt
  }
}
