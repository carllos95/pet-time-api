import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export class UserDeleteRepository {
  async findUser(id) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }

  async deleteUser(id) {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        situation: 2
      }
    })

    return user
  }
}
