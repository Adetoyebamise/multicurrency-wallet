export default interface IAppConfig {
    environment: string
    port: number
    jwtKey: string
    otpExpiration: number
    sql: {
        host: string
        dbname: string
        user: string
        password: string
        port: number
    }
    typeorm: {
        entities: Array<string>
    } 
    paystack: {
        secretKey: string,
        baseUrl: string
    }, 
}