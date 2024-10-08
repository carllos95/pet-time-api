import { User } from "../repositories/userRepository.js";

const user = new User()

export async function userUseCase(userId) {
  if (!userId) {
    throw new Error('User id required!')
  }

  const foundUser = await user.userFound(userId)
  if (!foundUser) {
    throw new Error('User not found!')
  }

  return foundUser
}
