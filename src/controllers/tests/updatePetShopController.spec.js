import { petShopUpdateUseCase } from "../../use-cases/petShopUpdateUseCase.js"
import updatePetShopController from "../updatePetShopController"

jest.mock('../../use-cases/petShopUpdateUseCase.js')

describe('updatePetShopController', () => {
  test('should update pet shop', async () => {
    const req = {
      body: {
        name: 'Pet Shop Teste',
        description: 'Pet Shop Teste',
        logo: 'https://petshopteste.com.br',
        address: 'Rua teste de teste',
        address_number: '00',
        zip_code: '00000-000',
        city: 'Cidade Teste',
        uf: 'Estado Teste',
        userId: '1'
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      message: jest.fn()
    }

    const petShopData = req.body

    await updatePetShopController(req, res)

    expect(petShopUpdateUseCase).toHaveBeenCalledTimes(1)
    expect(petShopUpdateUseCase).toHaveBeenCalledWith(petShopData)
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Pet Shop atualizado com sucesso!' })
  })
})
