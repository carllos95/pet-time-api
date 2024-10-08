import { UserRepository } from "../repositories/userCreateRepository.js"

const userRepository = new UserRepository()

export async function createUseCase(userData) {
  if (!userData.email || !userData.password || !userData.document || !userData.phone || !userData.name) {
    throw new Error('Campos obrigatórios faltando!')
  }

  const existingUser = await userRepository.findByEmail(userData.email)
  if (existingUser) {
    throw new Error('Usuário já existe no sistema!')
  }

  const newUser = await userRepository.create(userData)

  return newUser
}
