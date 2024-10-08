import { userUseCase } from "../../use-cases/userUseCase.js"
import userController from "../userController"

jest.mock('../../use-cases/userUseCase.js')

describe('userController', () => {
  test('should return user info', async () => {
    const req = {
      body: {
        userId: '1'
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      data: jest.fn()
    }

    const user = {}
    userUseCase.mockResolvedValue(user)

    await userController(req, res)

    expect(userUseCase).toHaveBeenCalledTimes(1)
    expect(userUseCase).toHaveBeenCalledWith('1')

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      data: user
    })
  })
})
