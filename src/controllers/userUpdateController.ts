import { Request, Response } from "express"
import { UpdateUserRequestBody } from "../../src/types/UpdateUserRequestBody"
import { userUpdateUseCase } from "../../src/use-cases/userUpdateUseCase"


export default async function userUpdateController(req: Request<{}, {}, UpdateUserRequestBody>, res: Response) {
  try {
    const updateUserData = req.body

    await userUpdateUseCase(updateUserData)

    res.status(201).json({ message: "Usuário atualizado com sucesso!" })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
