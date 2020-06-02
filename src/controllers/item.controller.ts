import { Request, Response } from "express"

import itemService from '../services/item.service'

class ItemController {

    public async index(request: Request, response: Response) {
        try {
            return response.json(await itemService.getAll())
        } catch (error) {
            console.error('ItemController error: ', error)
            return response.send(error.message)
        }
    }

}

export default new ItemController()