import { AppDataSource } from "../data-source";
import { ZonaCultivo } from "../models/zonaCultivo";

export const InsertCampo = async (nombre: string, cultivo: string, tipo: string) => {
    const campo = new ZonaCultivo();
    campo.nombre = nombre;
    campo.ubicacion = "Norte";
    campo.tipoSuelo = tipo; 
    campo.cultivoActual = cultivo;


    AppDataSource.manager.insert(ZonaCultivo, campo);
    return await AppDataSource.manager.save(campo);
}

export const InfoCampo = async () => {
    return await AppDataSource.manager.find(ZonaCultivo)
}

export const InfoCampoById = async (id: number)=> {
    return await AppDataSource.manager.findOneBy(ZonaCultivo, { id });
}

export const UpdateCampo = async (id: number, nombre: string, cultivo: string, tipo: string) => {   
    const campo = await InfoCampoById(id);
    if (!campo) {
        throw new Error('Campo no encontrado');
    }
    campo.nombre = nombre;
    campo.ubicacion = "Norte";
    campo.tipoSuelo = tipo; 
    campo.cultivoActual = cultivo;
    return await AppDataSource.manager.save(campo);
}

export const DeleteCampo = async (id: number) => {
    const campo = await InfoCampoById(id);
    if (!campo) {
        throw new Error('Campo no encontrado');
    }
    return await AppDataSource.manager.remove(campo);
}
