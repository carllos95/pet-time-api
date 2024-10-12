import { petShopUpdateUseCase } from "../use-cases/petShopUpdateUseCase.js"

export default async function updatePetShopController(req, res) {
  try {
    const petShopData = req.body

    await petShopUpdateUseCase(petShopData)

    res.status(201).json({ message: 'Pet Shop atualizado com sucesso!' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
