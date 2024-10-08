import { userUpdateUseCase } from "../use-cases/userUpdateUseCase.js"


export default async function userUpdateController(req, res) {
  try {
    const updateUserData = req.body

    await userUpdateUseCase(updateUserData)

    res.status(201).json({ message: "Usuário atualizado com sucesso!" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
