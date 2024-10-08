import { PrismaClient } from "@prisma/client"
import slugify from "slugify"

const prisma = new PrismaClient()

export class PetShopUpdateRepository {
  async hasPetShopId(petShopId) {
    return petShopId
  }

  async foundPetShop(petShopId) {
    const petShop = await prisma.petShop.findUnique({
      where: {
        id: petShopId
      }
    })

    return petShop
  }

  async updatePetShop(petShopData) {
    const petShop = await prisma.petShop.findUnique({
      where: {
        id: petShopData.id
      }
    })

    const newPetShopData = {
      name: petShopData.name ? petShopData.name : petShop.name,
      description: petShopData.description ? petShopData.description : petShop.description,
      phone: petShopData.phone ? petShopData.phone : petShop.phone,
      logo: petShopData.logo ? petShopData.logo : petShop.logo,
      cnpj: petShop.cnpj,
      address: petShopData.address ? petShopData.address : petShop.address,
      address_number: petShopData.address_number ? petShopData.address_number : petShop.address,
      zip_code: petShopData.zip_code ? petShopData.zip_code : petShop.zip_code,
      city: petShopData.city ? petShopData.city : petShop.city,
      uf: petShopData.uf ? petShopData.uf : petShop.uf,
      userId: petShop.userId,
      slug: petShopData.slug ? slugify(petShopData.name, { lower: true }) : petShop.slug
    }

    const petShopUpdated = await prisma.petShop.update({
      where: {
        id: petShopData.id
      },
      data: {
        ...newPetShopData
      }
    })

    return petShopUpdated
  }
}
