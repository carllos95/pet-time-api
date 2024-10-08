import { UserLogin } from "../repositories/userLoginRepository.js"

const userLogin = new UserLogin()

export async function loginUseCase(userData) {
  if (!userData.email || !userData.password) {
    throw new Error('Campos necessários faltantes: E-mail e Senha!')
  }

  const userExists = await userLogin.userExists(userData.email)
  if (!userExists) {
    throw new Error('Usuário não encontrado!')
  }

  const comparePassword = await userLogin.passwordCompare(userData)
  if (!comparePassword) {
    throw new Error('Senha errada!')
  }


  const token = await userLogin.genarateLoginToken(userData)

  return token
}
