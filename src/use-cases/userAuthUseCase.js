import { UserAuth } from "../repositories/userAuthRepository.js";

const userAuth = new UserAuth()

export async function authUseCase(req) {

  const hasToken = await userAuth.hasToken(req)
  if (!hasToken) {
    throw new Error('Missing required token!')
  }

  const verifyToken = await userAuth.verifyToken(req)
  if (!verifyToken) {
    throw new Error('Invalid Token!')
  }
}
