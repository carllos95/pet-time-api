import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient()

export class PetShopRepository {
  async isTherePetShop(cnpj) {
    const petShopAlreadyExists = await prisma.petShop.findUnique({
      where: {
        cnpj
      }
    })
    return petShopAlreadyExists
  }

  async isThereUserId(id) {
    return id
  }

  async isThereUser(id) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }

  async createPetShop(petShopData) {
    const slug = slugify(petShopData.name, { lower: true });

    const newPetShop = await prisma.petShop.create({
      data: {
        ...petShopData,
        slug
      }
    })


    return newPetShop
  }
}
