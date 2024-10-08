import { userUseCase } from "../use-cases/userUseCase.js"

export default async function userController(req, res) {
  try {
    const { userId } = req.body
    const user = await userUseCase(userId)

    res.status(201).json({ data: user })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
