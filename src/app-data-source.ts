import { DataSource } from "typeorm"
import { Dog } from "./dogs/entity/Dog"

export const AppDataSource = new DataSource({
    "type": "mariadb",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "1234",
    "database": "dog_api_db",
    "entities": [Dog],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })