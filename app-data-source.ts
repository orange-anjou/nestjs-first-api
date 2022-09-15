import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    "type": "mariadb",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "my-secret-pw",
    "database": "dog_api_db",
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })