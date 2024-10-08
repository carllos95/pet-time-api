import userLoginController from "../userLoginController"
import { loginUseCase } from "../../use-cases/userLoginUserCase.js"

jest.mock('../../use-cases/userLoginUserCase.js')

describe('userLoginController', () => {
  test('should login user', async () => {
    const req = {
      body: {
        email: 'johndoe@johndoe.com',
        password: '123456'
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      message: jest.fn()
    }

    const mockToken = 'mocked-jwt-token'
    loginUseCase.mockResolvedValue(mockToken);

    await userLoginController(req, res)

    expect(loginUseCase).toHaveBeenCalledTimes(1)
    expect(loginUseCase).toHaveBeenCalledWith({
      email: 'johndoe@johndoe.com',
      password: '123456'
    })

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Usuário logado com sucesso!',
      token: mockToken,
    });
  })
})
