import express from 'express'
import createUserController from './controllers/createUserController'

// import userUpdateController from './src/controllers/userUpdateController.js'
// import userLoginController from './src/controllers/userLoginController.js'
// import userAuthController from './src/controllers/userAuthController.js'
// import userController from './src/controllers/userController.js'
// import userDeleteController from './src/controllers/userDeleteController.js'
// import createPetShopController from './src/controllers/createPetShopController.js'
// import updatePetShopController from './src/controllers/updatePetShopController.js'

const app = express()

app.use(express.json())

app.post('/create', createUserController)

// app.post('/updateUser', userUpdateController)

// app.post('/deleteUser', userDeleteController)

// app.post('/login', userLoginController)

// app.get('/authentication', userAuthController)

// app.post('/user', userController)

// app.post('/createPetShop', createPetShopController)

// app.post('/updatePetShop', updatePetShopController)

export default app
