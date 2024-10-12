import { PrismaClient } from "@prisma/client"
import { UpdateUserRequestBody } from "../../src/types/UpdateUserRequestBody"
import { hashPassword } from "../../src/utils/hashPassword"

const prisma = new PrismaClient()

export class UserUpdateRepository {
  async findUserRegister(id: string) {
    const userFounded = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return userFounded
  }

  async updateUser(userData: UpdateUserRequestBody) {
    const findUserRegister = await prisma.user.findUnique({
      where: {
        id: userData.id
      }
    })

    if (!findUserRegister) {
      throw new Error('Usuário não encontrado');
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userData.id
      },
      data: {
        name: userData.name || findUserRegister.name,
        document: userData.document || findUserRegister.document,
        email: findUserRegister.email,
        phone: userData.phone || findUserRegister.phone,
        password: await hashPassword(userData.password) || findUserRegister.password
      }
    })

    return updatedUser
  }
}
