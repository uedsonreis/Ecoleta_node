import repositories from '../repositories'

import { Point } from '../entities/point'
import { Item } from '../entities/item'
import { serializeImage, serializeImages } from '../utils'

class PointService {

    public async getAll(city: any, uf: any, items: any) {

        const parsedItems = String(items).split(',').map(item => Number(item.trim()))

        const points: Point[] = await repositories.getPointRepository()
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city).toUpperCase())
            .where('uf', String(uf).toUpperCase())
            .distinct()
        .select('points.*')

        return serializeImages(points)
    }

    public async get(id: number) {
        const point: Point = await repositories.getPointRepository().where('id', id).first()

        if (!point) return undefined

        const serializedPoint: any = serializeImage(point)

        const items: Item[] = await repositories.getItemRepository()
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id).select(['items.id', 'items.title', 'items.image'])

        serializedPoint.items = items

        return serializedPoint
    }

    public async save(point: Point): Promise<number> {
        const trx = await repositories.getTransaction()

        const saved = {
            image: point.image,
            name: point.name,
            email: point.email,
            whatsapp: point.whatsapp,
            latitude: Number(point.latitude),
            longitude: Number(point.longitude),
            city: point.city.toUpperCase(),
            uf: point.uf.toUpperCase(),
        }

        try {
            const insertedIds = await repositories.getPointRepository().transacting(trx).insert(saved).returning('id')

            const id = insertedIds[0]

            const arrayItemId = String(point.items).split(',').map(itemId => Number(itemId.trim()))
    
            const pointItems = arrayItemId.map(itemId => ({
                point_id: id,
                item_id: itemId
            }))
            await repositories.getPointItemRepository().transacting(trx).insert(pointItems)

            await trx.commit()
            return id
            
        } catch (error) {
            await trx.rollback()
            throw new Error(error)
        }
    }

    public async delete(id: number) {
        await repositories.getPointRepository().delete().where('id', id)
    }

}

export default new PointService()