import {Cultivo, LecturaSensor, Sensor, User} from "./models/cultivos";
import { Riego } from "./models/riego";
import { ZonaCultivo } from "./models/zonaCultivo";
import 'reflect-metadata';
import { DataSource } from 'typeorm';
// import { View } from "./models/view";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Hola",   
    database: "cultivodb", 
    synchronize: true,
    logging: true,
    entities: [Cultivo,User,Sensor, LecturaSensor,ZonaCultivo,Riego],
    subscribers: [],
    migrations: [],
});


