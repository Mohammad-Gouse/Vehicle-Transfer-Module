import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Driver } from 'src/driver/driver.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Driver, (driver) => driver.transfers)
  driver: Driver;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.transfers)
  vehicle: Vehicle;

  @Column()
  transferDate: Date;
}
