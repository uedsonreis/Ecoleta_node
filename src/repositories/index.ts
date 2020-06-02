import session from '../database/connections'

class Repositories {

    public async getTransaction() {
        return await session.transaction()
    }

    public getItemRepository() {
        return session('items')
    }

    public getPointRepository() {
        return session('points')
    }

    public getPointItemRepository() {
        return session('point_items')
    }

}

export default new Repositories()