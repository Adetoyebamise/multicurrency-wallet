import * as joi from 'joi';
import IAppConfig from './config'

let entitiesPath = 'dist/users/entities/*entity.ts'
if(process.env.ENV === "development") {
    entitiesPath = "src/users/entities/*entity.ts"
}

export default class AppConfigFactory {
    public FromEnvVar(): IAppConfig {
        const envVarsSchema = joi
        .object()
        .keys({
            ENV: joi.string().required(),
            PORT: joi.number().positive().default(3000),
            JWTKEY: joi.string().required(),
            DB_HOST: joi.string().required(),
            DB_NAME: joi.string().required(),
            DB_USER: joi.string().required(),
            DB_PASS: joi.string().allow(null, '').required(),
            DB_PORT: joi.number().required(),
            DB_ENTITIES: joi.string().default(entitiesPath), 
            OTPEXPIRATION: joi.number().required(),
            PAYSTACK_SECRETKEY: joi.string().required(),
            PAYSTACK_BASEURL: joi.string().required(), 
        })
        .unknown()

        const { value: envVars, error } = envVarsSchema.prefs({errors: { label: 'key'} }).validate(process.env)

        if(error) {
            throw new Error(`Config Validation Error: ${error.message}`)
        }

        return {
            environment: envVars.ENV,
            port: envVars.PORT,
            jwtKey: envVars.JWTKEY,
            otpExpiration: envVars.OTPEXPIRATION,
            sql: {
                host: envVars.DB_HOST,
                dbname: envVars.DB_NAME,
                user: envVars.DB_USER,
                password: envVars.DB_PASS,
                port: envVars.DB_PORT,
            },
            typeorm: {
                entities: [entitiesPath]
            }, 
            paystack: {
                secretKey: envVars.PAYSTACK_SECRETKEY,
                baseUrl: envVars.PAYSTACK_BASEURL
            }, 
        }
    }
}
