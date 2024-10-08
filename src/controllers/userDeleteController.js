import { userDeleteUseCase } from "../use-cases/userDeleteUseCase.js"

export default async function userDeleteController(req, res) {
  try {

    const { id } = req.body

    await userDeleteUseCase(id)

    res.status(201).json({ message: 'Usuário deletado com sucesso!' })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }

}
