import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../utils/hashPassword.js"

const prisma = new PrismaClient()

export class UserUpdateRepository {
  async findUserRegister(id) {
    const userFounded = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return userFounded
  }

  async updateUser(userData) {
    const findUserRegister = await prisma.user.findUnique({
      where: {
        id: userData.id
      }
    })

    const updatedUser = await prisma.user.update({
      where: {
        id: userData.id
      },
      data: {
        name: userData.name ? userData.name : findUserRegister.name,
        document: userData.document ? userData.document : findUserRegister.document,
        email: findUserRegister.email,
        phone: userData.phone ? userData.phone : findUserRegister.phone,
        password: userData.password ? await hashPassword(userData.password) : findUserRegister.password
      }
    })

    return updatedUser
  }
}
