import { AppDataSource } from "../data-source";
import { Sensor } from "../models/cultivos";

export const insertSensor = async (unidadMedida: string, tipoSensor: string, fechaInstalacion: Date, modelo: string) => {
    const sensor = new Sensor();
    sensor.tipo = tipoSensor;
    sensor.zonaCultivo = "centro";
    sensor.modelo = modelo; // Asignar un modelo por defecto o pasar como parámetro
    sensor.unidadMedida = unidadMedida
    sensor.fechaUltimaLectura = fechaInstalacion;
    sensor.estado = "activo" // 'activo' o 'inactivo'

    AppDataSource.manager.insert(Sensor, sensor);
    return await AppDataSource.manager.save(sensor);
}

export const getSensors = async () => { 
    return await AppDataSource.manager.find(Sensor);
}

export const getSensorById = async (id: number) => {
    return await AppDataSource.manager.findOneBy(Sensor, { id });
}

export const updateSensor = async (id: number, unidadMedida: string, tipoSensor: string, fechaInstalacion: Date, modelo: string) => {
    const sensor = await getSensorById(id);
    if (!sensor) {
        throw new Error('Sensor no encontrado');
    }
    sensor.tipo = tipoSensor;
    sensor.zonaCultivo = "centro";
    sensor.unidadMedida = unidadMedida;
    sensor.fechaUltimaLectura = fechaInstalacion;
    sensor.estado = "inactivo"; 
    return await AppDataSource.manager.save(sensor);
}

export const deleteSensor = async (id: number) => {
    const sensor = await getSensorById(id);
    if (!sensor) {
        throw new Error('Sensor no encontrado');
    }
    return await AppDataSource.manager.remove(sensor);
}