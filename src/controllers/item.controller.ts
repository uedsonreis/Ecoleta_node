import { Request, Response } from "express"

import itemService from '../services/item.service'
import { HttpCodes } from "../config/utils"

class ItemController {

    public async index(request: Request, response: Response) {
        try {
            return response.status(HttpCodes.OK).json(await itemService.getAll())
        } catch (error) {
            console.error('ItemController error: ', error)
            return response.status(HttpCodes.BAD_REQUEST).send(error.message)
        }
    }

}

export default new ItemController()