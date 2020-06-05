import repositories from '../repositories'
import { Item } from '../entities/item'
import { serializeImages } from '../utils'

class ItemService {

    public async getAll() {
        const items: Item[] = await repositories.getItemRepository().select('*')
        return serializeImages(items)
    }

    public async save(item: Item): Promise<number> {
        const result = await repositories.getItemRepository().insert({ ...item })   
        return result[0]
    }

}

export default new ItemService()