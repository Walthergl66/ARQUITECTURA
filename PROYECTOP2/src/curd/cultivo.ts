import { AppDataSource } from "../data-source";
import { Cultivo } from "../models/cultivos";

export const insertCultivo = async (nombre: string, tipo: string, fechaSiembra: Date, fechaCosecha: Date) => {
    const cultivo1 = new Cultivo();
    cultivo1.nombre = nombre;
    cultivo1.tipoCultivo = tipo;
    cultivo1.fechaSiembra = fechaSiembra;
    cultivo1.fechaCosecha = fechaCosecha;
    cultivo1.zonaCultivo = "Zona 1"; 
    AppDataSource.manager.insert
    return await AppDataSource.manager.save(cultivo1);
}

export const getCultivos = async () => {
    return await AppDataSource.manager.find(Cultivo);
}

export const getCultivoById = async (id: number) => {
    return await AppDataSource.manager.findOneBy(Cultivo, { id });
}

export const updateCultivo = async (id: number, nombre: string, tipo: string, fechaSiembra: Date, fechaCosecha: Date) => {
    const cultivo = await getCultivoById(id);
    if (!cultivo) {
        throw new Error('Cultivo no encontrado');
    }
    cultivo.nombre = nombre;
    cultivo.tipoCultivo = tipo;
    cultivo.fechaSiembra = fechaSiembra;
    cultivo.fechaCosecha = fechaCosecha;
    return await AppDataSource.manager.save(cultivo);
}

export const deleteCultivo = async (id: number) => {
    const cultivo = await getCultivoById(id);
    if (!cultivo) {
        throw new Error('Cultivo no encontrado');
    }
    return await AppDataSource.manager.remove(cultivo);
}
