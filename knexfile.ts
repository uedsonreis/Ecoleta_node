import path from 'path'

import env from './src/config/env'

module.exports = {
    client: 'pg',
    version: '12',
    useNullAsDefault: true,
    connection: {
        host: env.host,
        user: env.user,
        password: env.password,
        database: env.database
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'config', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'config', 'database', 'seeds')
    }
}