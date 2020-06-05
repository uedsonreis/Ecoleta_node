import multer from 'multer'
import { Request } from 'express'
import crypto from 'crypto'
import path from 'path'

const config: multer.Options = {

    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (request: Request, file: Express.Multer.File, callback) => {
            try {
                const hash = crypto.randomBytes(6).toString('hex')
                const fileName = `${hash}-${file.originalname}`
                callback(null, fileName)
            } catch (error) {
                console.error('Error on upload a file: ', error)
                callback(error, 'error')
            }
        }
    })

}

export default multer(config)