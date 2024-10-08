import { userDeleteUseCase } from "../../use-cases/userDeleteUseCase.js"
import userDeleteController from "../userDeleteController"

jest.mock('../../use-cases/userDeleteUseCase.js')

describe('userDeleteController', () => {
  test('should delete user', async () => {
    const req = {
      body: {
        id: "1"
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      message: jest.fn()
    }

    await userDeleteController(req, res)

    expect(userDeleteUseCase).toHaveBeenCalledTimes(1)
    expect(userDeleteUseCase).toHaveBeenCalledWith("1")

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Usuário deletado com sucesso!'
    });
  })
})
