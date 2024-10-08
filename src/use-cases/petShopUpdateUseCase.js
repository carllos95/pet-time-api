import { PetShopUpdateRepository } from "../repositories/petShopUpdateRepository.js"

const petShopUpdateRepository = new PetShopUpdateRepository()
export async function petShopUpdateUseCase(petShopData) {

  const hasPetShopId = await petShopUpdateRepository.hasPetShopId(petShopData.id)
  if (!hasPetShopId) {
    throw new Error("Id do Pet Shop deve ser enviado no corpo da requisição!")
  }

  const foundPetShop = await petShopUpdateRepository.foundPetShop(petShopData.id)
  if (!foundPetShop) {
    throw new Error("Pet Shop não encontrado. Verifique o Id enviado no corpo da requisição!")
  }

  const updatePetShop = await petShopUpdateRepository.updatePetShop(petShopData)
  return updatePetShop
}
