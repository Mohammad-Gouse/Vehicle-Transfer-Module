import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Transfer } from 'src/transfer/transfer.entity';


@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleNumber: string;

  @Column()
  vehicleType: string;

  @Column({ type: 'bytea', nullable: true })
  pucCertificate: Buffer;

  @Column({ type: 'bytea', nullable: true })
  insuranceCertificate: Buffer;

  @OneToMany(() => Transfer, (transfer) => transfer.vehicle)
  transfers: Transfer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
