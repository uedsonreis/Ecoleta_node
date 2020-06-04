import repositories from '../repositories'
import { Item } from '../entities/item'

class ItemService {

    public async getAll() {
        const items: Item[] = await repositories.getItemRepository().select('*')

        const serializedItems = items.map(item => ({
            id: item.id, title: item.title,
            imageUrl: `http://192.168.0.25:3333/uploads/${item.image}`
        }))

        return serializedItems
    }

    public async save(item: Item): Promise<number> {
        const result = await repositories.getItemRepository().insert({ ...item })   
        return result[0]
    }

}

export default new ItemService()