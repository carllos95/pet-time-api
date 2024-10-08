import { PetShopRepository } from "../repositories/petShopRepository.js";
import { verifyRequiredFields } from "../utils/verifyRequiredFields.js";

const petShopRepository = new PetShopRepository()

export async function createPetShopUseCase(petShopData) {

  const requiredFields = ['name', 'description', 'logo', 'cnpj', 'address', 'address_number', 'city', 'zip_code', 'uf', 'userId']

  const verifyFields = verifyRequiredFields(petShopData, requiredFields)

  if (!verifyFields) {
    throw new Error(verifyFields)
  }

  const existingUserId = await petShopRepository.isThereUserId(petShopData.userId)
  if (!existingUserId) {
    throw new Error('É necessário enviar o userId junto aos dados no corpo da requisição!')
  }

  const existingUser = await petShopRepository.isThereUser(petShopData.userId)
  if (!existingUser) {
    throw new Error('Pet Shop não encontrado, verifique o userId enviado!')
  }

  const existingPetShop = await petShopRepository.isTherePetShop(petShopData.cnpj)
  if (existingPetShop) {
    throw new Error('Pet Shop já existe no sistema!')
  }

  const newPetShop = await petShopRepository.createPetShop(petShopData)

  return newPetShop
}
