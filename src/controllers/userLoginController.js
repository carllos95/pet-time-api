import { loginUseCase } from "../use-cases/userLoginUserCase.js"


export default async function userLoginController(req, res) {
  try {
    const { email, password } = req.body

    const user = {
      email,
      password
    }

    const token = await loginUseCase(user)

    res.status(201).json({ message: 'Usuário logado com sucesso!', token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
