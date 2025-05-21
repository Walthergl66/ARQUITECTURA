import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Sensor} from "./cultivos";
import { Riego } from "./riego";
@Entity()
export class ZonaCultivo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  ubicacion!: "Norte" | "Sur" | "Este" | "Oeste" | "Centro"; // Ubicación geográfica de la zona

  @Column()
  tipoSuelo!: string; // Ej: "arcilloso", "arenoso", "franco", etc.

  @Column()
  cultivoActual!: string; // Ej: "Tomate", "Maíz"

//   @Column()
//   latitud!: number;

//   @Column()
//   longitud!: number;

  @OneToMany(() => Sensor, sensor => sensor.zonaCultivo)
  sensores!: Sensor[];

  @OneToMany(() => Riego, riego => riego.zonaCultivo)
  riegos!: Riego[];

}
