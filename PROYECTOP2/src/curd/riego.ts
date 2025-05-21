import { AppDataSource } from "../data-source";
import { Riego,} from "../models/riego";
import { ZonaCultivo } from "../models/zonaCultivo";

export const insertRiego = async (cantidadAgua: number, fechaRiego: Date, zonaCultivoName: string) => {
    const zonaRepo = await AppDataSource.getRepository(ZonaCultivo);

    const zona = await zonaRepo.findOne({where: { nombre: zonaCultivoName }});
    if (!zona) {
        throw new Error('Zona de cultivo no encontrada');
    }

    const riego = new Riego();
    riego.cantidadAgua = cantidadAgua;
    riego.fecha = fechaRiego;
    riego.zonaCultivo = zona; // Asignar una zona de cultivo específica

    AppDataSource.manager.insert(Riego, riego);
    return await AppDataSource.manager.save(riego);
}

export const getRiegos = async () => {
    return await AppDataSource.manager.find(Riego, { relations: ["zonaCultivo"] });
}

export const getRiegoById = async (id: number) => {
    return await AppDataSource.manager.findOne(Riego, { where: { id }, relations: ["zonaCultivo"] });
}

export const updateRiego = async (id: number, cantidadAgua: number, fechaRiego: Date, zonaCultivoName: string) => {
    const riego = await getRiegoById(id);
    if (!riego) {
        throw new Error('Riego no encontrado');
    }
    riego.cantidadAgua = cantidadAgua;
    riego.fecha = fechaRiego;

    return await AppDataSource.manager.save(riego);
}

export const deleteRiego = async (id: number) => {
    const riego = await getRiegoById(id);
    if (!riego) {
        throw new Error('Riego no encontrado');
    }
    return await AppDataSource.manager.remove(riego);
}