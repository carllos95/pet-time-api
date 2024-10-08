import jwt from 'jsonwebtoken'
import { authUseCase } from "../../use-cases/userAuthUseCase.js"
import userAuthController from '../userAuthController.js'

jest.mock('../../use-cases/userAuthUseCase.js')

const JWT_SECRET = 'apipettime'

describe('userAuthController', () => {
  test('should authenticate user', async () => {
    const token = jwt.sign({ userId: "123456" }, JWT_SECRET, { expiresIn: '1h' })
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      user: {}
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      user: jest.fn()
    }

    await userAuthController(req, res)

    expect(authUseCase).toHaveBeenCalledTimes(1)
    expect(authUseCase).toHaveBeenCalledWith({
      headers: {
        authorization: `Bearer ${token}`
      },
      user: {}
    })

    expect(res.status).toHaveBeenCalledWith(201)

    expect(res.json).toHaveBeenCalledWith({
      user: req.user
    })
  })
})
