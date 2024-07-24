import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { Transfer } from './transfer.entity';
import { Driver } from '../driver/driver.entity';
import { Vehicle } from '../vehicle/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer, Driver, Vehicle])],
  providers: [TransferService],
  controllers: [TransferController],
})
export class TransferModule {}
