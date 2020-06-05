import express from 'express'

import userController from './controllers/user.controller'
import itemController from './controllers/item.controller'
import pointController from './controllers/point.controller'

import upload from './config/file.upload'

const routes = express.Router()

routes.get('/users', userController.getAll)
routes.get('/users/:id', userController.get)
routes.post('/users', userController.save)

routes.get('/items', itemController.index)

routes.get('/points', pointController.index)
routes.get('/points/:id', pointController.show)
routes.post('/points', upload.single('image'), pointController.validate, pointController.create)

export default routes