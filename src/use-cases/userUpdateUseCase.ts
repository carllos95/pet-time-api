import { UserUpdateRepository } from "../../src/repositories/userUpdateRepository"
import { UpdateUserRequestBody } from "../../src/types/UpdateUserRequestBody"

const userUpdateRepository = new UserUpdateRepository()

export async function userUpdateUseCase(userData: UpdateUserRequestBody) {
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
