import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,OneToMany } from "typeorm";
import { ZonaCultivo } from "./zonaCultivo";

@Entity()
export class Riego {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cantidadAgua!: number; // Cantidad de agua en litros

  @Column()
  fecha!: Date;

//   @Column()
//   duracionMinutos!: number;

//   @Column()
//   volumenLitros!: number;

//   @Column()
//   activadoAutomaticamente!: boolean;

  @ManyToOne(() => ZonaCultivo, zona => zona.riegos)
  @JoinColumn({ name: 'zonaCultivoId' })
  zonaCultivo!: ZonaCultivo;

//   @Column()
//   zonaCultivoId!: number;
}

