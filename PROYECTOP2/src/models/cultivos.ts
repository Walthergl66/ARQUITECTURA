import {Column, Entity, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Cultivo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  tipoCultivo!: string;

  @Column()
  zonaCultivo!: string;

  @Column()
  fechaSiembra!: Date;

  @Column()
  fechaCosecha!: Date;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() 
  username!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  rol!: string; // 'admin' o 'user'

}

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id!: number;

  // @Column()
  // nombre!: string;

  @Column()
  tipo!: string;

  @Column()
  modelo!: string;

  @Column()
  unidadMedida!: string;

  @Column()
  estado! : 'activo' | 'inactivo' | 'mantenimiento';

  // @Column()
  // latitud!: number;

  // @Column()
  // longitud!: number;

  // @Column()
  // altura?: number;

  @Column()
  zonaCultivo!: 'norte' | 'sur' | 'este' | 'oeste' | 'centro';

  // @Column()
  // frecuenciaLectura!: number;

  // @Column()
  // ultimaLectura!: number;

  @Column()
  fechaUltimaLectura!: Date;

  // @Column()
  // rangoMin!: number;

  // @Column()
  // rangoMax!: number;

  @OneToMany(() => LecturaSensor, lectura => lectura.sensor, {
    cascade: true
  })
  historialLecturas!: LecturaSensor[];
}

@Entity()
export class LecturaSensor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  valor!: number;

  @Column()
  fechaHora!: Date;

  @Column()
  unidadMedida!: string;

  @Column()
  estadoAlerta!: 'normal' | 'critico' | 'fuera_rango';

  @ManyToOne(() => Sensor, sensor => sensor.historialLecturas)
  @JoinColumn({ name: 'sensorId' })
  sensor!: Sensor;

  @Column()
  sensorId!: number;
}




