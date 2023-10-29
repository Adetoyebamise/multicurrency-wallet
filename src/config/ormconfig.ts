require('dotenv').config();
import { DataSource } from 'typeorm';

const devDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [
        'src/users/entities/*entity.ts'
    ],
});

export default devDataSource;