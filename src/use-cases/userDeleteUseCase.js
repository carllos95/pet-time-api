import { UserDeleteRepository } from "../repositories/userDeleteRepository.js";

const userDeleteRepository = new UserDeleteRepository()

export async function userDeleteUseCase(id) {
  if (!id) {
    throw new Error('Id deve ser enviado no corpo da requisição!')
  }

  const hasId = await userDeleteRepository.findUser(id)
  if (!hasId) {
    throw new Error('Usuário não encontrado, verifique o id enviado!')
  }

  const deleteUser = await userDeleteRepository.deleteUser(id)

  return deleteUser
}
