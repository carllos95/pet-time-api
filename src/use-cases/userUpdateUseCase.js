import { UserUpdateRepository } from "../repositories/userUpdateRepository.js";

const userUpdateRepository = new UserUpdateRepository()

export async function userUpdateUseCase(userData) {
  if (!userData.id) {
    throw new Error('Id do usuário deve ser enviado no corpo da requisição!')
  }

  const findUserData = await userUpdateRepository.findUserRegister(userData.id)

  if (!findUserData) {
    throw new Error('Usuário não encontrado ou id informado está incorreto!')
  }

  const updateUser = await userUpdateRepository.updateUser(userData)

  return updateUser
}
