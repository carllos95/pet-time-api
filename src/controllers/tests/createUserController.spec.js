import createUserController from '../createUserController.js'
import { createUseCase } from '../../use-cases/userCreateUseCase.js'

jest.mock('../../use-cases/userCreateUseCase.js')

describe('createUserController', () => {
  test('Should create user', async () => {

    const req = {
      body: {
        name: 'Usuário Teste',
        email: 'usuario@teste.con',
        phone: '41900000000',
        document: '00000000000'
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      message: jest.fn()
    }

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
