import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transfer } from 'src/transfer/transfer.entity';

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

  @OneToMany(() => Transfer, (transfer) => transfer.driver)
  transfers: Transfer[];
}
