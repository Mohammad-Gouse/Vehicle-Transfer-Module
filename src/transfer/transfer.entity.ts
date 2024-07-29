import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Driver } from '../driver/driver.entity';
import { Vehicle } from '../vehicle/vehicle.entity';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Driver, (driver) => driver.transfersFrom)
  fromDriver: Driver;

  @ManyToOne(() => Driver, (driver) => driver.transfersTo)
  toDriver: Driver;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.transfers)
  vehicle: Vehicle;

  @Column()
  transferDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
