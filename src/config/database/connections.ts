import knex from 'knex'

import env from '../env'

const connection = knex({
    client: 'pg',
    version: '12',
    connection: {
        host: env.host,
        user: env.user,
        password: env.password,
        database: env.database
    }
})

export default connection