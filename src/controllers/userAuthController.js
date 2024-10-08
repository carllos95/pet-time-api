import { authUseCase } from "../use-cases/userAuthUseCase.js"

export default async function userAuthController(req, res) {
  try {
    await authUseCase(req)

    res.status(201).json({ user: req.user })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
