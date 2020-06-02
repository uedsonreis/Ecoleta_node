import { Request, Response } from "express"

class UserController {

    private users = [
        { id: 1, name: 'Bruno', email: "bruno@gmail.com" },
        { id: 2, name: 'Diego', email: 'diego@gmail.com', },
        { id: 3, name: 'Eduardo', email: 'eduardo@gmail.com', },
        { id: 4, name: 'Heitor', email: 'heitor@gmail.com', }
    ]

    public get = (request: Request, response: Response) => {
        const { id } = request.params
        const user = this.users.find(u => u.id === Number(id))
        return response.send(user)
    }

    public getAll = (request: Request, response: Response) => {
        const { search } = request.query

        if (search) {
            const filteredUsers = this.users.filter(user => user.name.includes(String(search)))
            return response.json(filteredUsers)
        } else {
            return response.json(this.users)
        }
    }

    public save = (request: Request, response: Response) => {
        const user = request.body
        user.id = this.users.length
        this.users.push(user)
        return response.json(user)
    }

}

export default new UserController()