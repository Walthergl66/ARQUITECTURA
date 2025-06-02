import { Cultivo } from "../models/cultivos";

export interface CultivoRepository {
    insert(nombre: string, tipo: string, fecha_inicio: Date, fecha_fin: Date, zona: string): Promise<Cultivo>;
    findAll(): Promise<Cultivo[]>;
    findById(id: number): Promise<Cultivo | null>;
    update(id: number, nombre: string, tipo: string, fecha_inicio: Date, fecha_fin: Date, zona: string): Promise<Cultivo | null>;
    delete(id: number): Promise<boolean>;
}
