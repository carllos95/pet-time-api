
import { createUseCase } from '../use-cases/userCreateUseCase.js';
import { hashPassword } from '../utils/hashPassword.js';

export default async function createUserController(req, res) {
  try {
    const { password, ...rest } = req.body

    const newUser = {
      ...rest,
      password: await hashPassword(password),
    }

    await createUseCase(newUser)

    res.status(201).json({ message: 'Usuário criado com sucesso!' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
