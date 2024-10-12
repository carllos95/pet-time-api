import { Request, Response } from "express";
import { createUseCase } from "../use-cases/userCreateUseCase"
import { hashPassword } from "../utils/hashPassword"
import { CreateUserRequestBody } from "../types/CreateUserRequestBody";

export default async function createUserController(req: Request<{}, {}, CreateUserRequestBody>, res: Response) {
  try {
    const { password, ...rest } = req.body

    const newUser = {
      ...rest,
      password: await hashPassword(password),
    }

    await createUseCase(newUser)

    res.status(201).json({ message: 'Usuário criado com sucesso!' })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
