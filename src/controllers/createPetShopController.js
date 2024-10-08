import { createPetShopUseCase } from "../use-cases/petShopCreateUseCase.js"

export default async function createPetShopController(req, res) {
  try {
    const petShopData = req.body

    await createPetShopUseCase(petShopData)

    res.status(201).json({ message: 'Pet Shop criado com sucesso!' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
