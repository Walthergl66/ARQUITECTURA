import { AppDataSource } from "../data-source";
import { Cultivo } from "../models/cultivos";
import { CultivoRepository } from "./CultivoRepository";

export class TypeORMCultivoRepository implements CultivoRepository {
  private repo = AppDataSource.getRepository(Cultivo);

  async insert(
    nombre: string,
    tipoCultivo: string,
    fechaSiembra: Date,
    fechaCosecha: Date,
    zonaCultivo: string
  ): Promise<Cultivo> {
    const cultivo = this.repo.create({
      nombre,
      tipoCultivo,
      fechaSiembra,
      fechaCosecha,
      zonaCultivo,
    });
    return this.repo.save(cultivo);
  }

  async findAll(): Promise<Cultivo[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Cultivo | null> {
    return this.repo.findOneBy({ id });
  }

  async update(
    id: number,
    nombre: string,
    tipoCultivo: string,
    fechaSiembra: Date,
    fechaCosecha: Date,
    zonaCultivo: string
  ): Promise<Cultivo | null> {
    const cultivo = await this.repo.findOneBy({ id });
    if (!cultivo) return null;

    cultivo.nombre = nombre;
    cultivo.tipoCultivo = tipoCultivo;
    cultivo.fechaSiembra = fechaSiembra;
    cultivo.fechaCosecha = fechaCosecha;
    cultivo.zonaCultivo = zonaCultivo;

    return this.repo.save(cultivo);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
