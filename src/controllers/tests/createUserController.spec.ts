import { Request, Response } from "express"
import { createUseCase } from "../../use-cases/userCreateUseCase"
import createUserController from "../createUserController"

jest.mock('../../use-cases/userCreateUseCase.ts')

describe('createUserController', () => {
  test('Should create user', async () => {

    const req = {
      body: {
        name: 'Usuário Teste',
        email: 'usuario@teste.con',
        phone: '41900000000',
        document: '00000000000'
      }
    } as Request

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      message: jest.fn()
    } as unknown as Response

    await createUserController(req, res)

    expect(createUseCase).toHaveBeenCalledTimes(1)
    expect(createUseCase).toHaveBeenCalledWith({
      name: 'Usuário Teste',
      email: 'usuario@teste.con',
      phone: '41900000000',
      document: '00000000000'
    })
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuário criado com sucesso!' });
  })
})
