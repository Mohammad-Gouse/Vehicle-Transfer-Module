import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transfer } from '../transfer/transfer.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'bytea', nullable: true })
  profilePhoto: Buffer;

  @OneToMany(() => Transfer, (transfer) => transfer.fromDriver)
  transfersFrom: Transfer[];

  @OneToMany(() => Transfer, (transfer) => transfer.toDriver)
  transfersTo: Transfer[];
}
