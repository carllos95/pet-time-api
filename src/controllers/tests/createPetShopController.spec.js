import { createPetShopUseCase } from "../../use-cases/petShopCreateUseCase.js"
import createPetShopController from "../createPetShopController"

jest.mock('../../use-cases/petShopCreateUseCase.js')

describe('createPetShopController', () => {
  test('should create pet shop', async () => {
    const req = {
      body: {
        name: 'Pet Shop Teste',
        description: 'Pet Shop Teste',
        logo: 'https://petshopteste.com.br',
        cnpj: '00.000.000/0000',
        address: 'Rua teste de teste',
        address_number: '00',
        zip_code: '00000-000',
        city: 'Cidade Teste',
        uf: 'Estado Teste',
        userId: '1'
      }
    }

    const petShopData = req.body

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      message: jest.fn()
    }

    await createPetShopController(req, res)

    expect(createPetShopUseCase).toHaveBeenCalledTimes(1)
    expect(createPetShopUseCase).toHaveBeenCalledWith(petShopData)
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Pet Shop criado com sucesso!' })
  })
})
