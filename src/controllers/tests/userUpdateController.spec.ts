import { Request, Response } from "express"
import { hashPassword } from "../../utils/hashPassword"
import userUpdateController from "../userUpdateController"
import { userUpdateUseCase } from "../../use-cases/userUpdateUseCase"

jest.mock('../../use-cases/userUpdateUseCase.ts')

describe('userUpdateController', () => {
  test('should user update', async () => {
    const req = {
      body: {
        id: '1',
        name: 'John Doe',
        document: '000.000.000-00',
        phone: '(00) 00000-0000',
        password: hashPassword('123456')
      }
    } as Request

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      message: jest.fn()
    } as unknown as Response

    await userUpdateController(req, res)

    expect(userUpdateUseCase).toHaveBeenCalledTimes(1)
    expect(userUpdateUseCase).toHaveBeenCalledWith({
      id: '1',
      name: 'John Doe',
      document: '000.000.000-00',
      phone: '(00) 00000-0000',
      password: hashPassword('123456')
    })

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Usuário atualizado com sucesso!'
    })
  })
})
