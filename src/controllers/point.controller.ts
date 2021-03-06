import { Request, Response } from "express"
import { celebrate, Joi } from 'celebrate'

import { HttpCodes } from '../config/utils'

import pointService from '../services/point.service'
import { Point } from "../entities/point"

class PointController {

    public validate = celebrate(
        {
            body: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.string().required(),
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
                city: Joi.string().required(),
                uf: Joi.string().required().min(2).max(2),
                items: Joi.string().required()
            })
        },
        { abortEarly: false }
    )

    public async create(request: Request, response: Response) {
        try {
            const point: Point = request.body
            point.image = request.file.filename
            
            const id = await pointService.save(point)
            response.status(HttpCodes.CREATED).json({ id })
        } catch (error) {
            console.error('PointController.save error: ', error)
            response.status(HttpCodes.BAD_REQUEST).send(error.message)
        }
    }

    public async index(request: Request, response: Response) {
        const { city, uf, items } = request.query
        try {
            const points = await pointService.getAll(city, uf, items)
            return response.json(points)
        } catch (error) {
            console.error('PointController.index error: ', error)
            return response.status(HttpCodes.BAD_REQUEST).send(error.message)
        }
    }

    public async show(request: Request, response: Response) {
        const { id } = request.params
        try {
            const point = await pointService.get(Number(id))
            if (point) {
                return response.status(HttpCodes.OK).json(point)
            } else {
                return response.status(HttpCodes.BAD_REQUEST).json({ message: 'Point not found.' })
            }
        } catch (error) {
            console.error('PointController.show error: ', error)
            return response.send(error.message)
        }
    }

    public async delete(request: Request, response: Response) {
        try {
            const { id } = request.params
            await pointService.delete(Number(id))
            response.status(HttpCodes.OK).json({ deleted: true })
        } catch (error) {
            console.error('PointController.delete error: ', error)
            response.status(HttpCodes.BAD_REQUEST).send(error.message)
        }
    }

}

export default new PointController()