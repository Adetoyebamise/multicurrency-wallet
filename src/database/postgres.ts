import { DataSource } from 'typeorm'


export declare type ConnectionOptions = {
    host: string
    dbname: string
    user: string
    password: string
    port: number
    entities: Array<any>
}

export const PostgresClient = async (options: ConnectionOptions): Promise<DataSource> => {
    const dataSource = new DataSource({
    type: "postgres",
    host: options.host,
    port: options.port,
    username: options.user,
    password: options.password,
    database: options.dbname,
    entities: options.entities, // ['src/users/entities/*entity.ts'],
    synchronize: process.env.DEV === "development",
    logging: true,
    })

    return await dataSource.initialize()
}