import { userUpdateUseCase } from "../../use-cases/userUpdateUseCase.js"
import { hashPassword } from "../../utils/hashPassword"
import userUpdateController from "../userUpdateController"

jest.mock('../../use-cases/userUpdateUseCase.js')

describe('userUpdateController', () => {
  test('should user update', async () => {
    const req = {
      body: {
        name: 'John Doe',
        document: '000.000.000-00',
        phone: '(00) 00000-0000',
        password: hashPassword('123456')
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      message: jest.fn()
    }

    await userUpdateController(req, res)

    expect(userUpdateUseCase).toHaveBeenCalledTimes(1)
    expect(userUpdateUseCase).toHaveBeenCalledWith({
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
