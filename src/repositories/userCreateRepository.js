import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserRepository {
  async findByEmail(email) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return userAlreadyExists
  }

  async create(userData) {
    const newUser = await prisma.user.create({
      data: {
        name: userData.name,
        document: userData.document,
        email: userData.email,
        phone: userData.phone,
        password: userData.password
      }
    })

    return newUser
  }
}
