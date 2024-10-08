import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class User {
  async userFound(userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    const { password, ...userWhitoutPassword } = user

    return userWhitoutPassword
  }
}
