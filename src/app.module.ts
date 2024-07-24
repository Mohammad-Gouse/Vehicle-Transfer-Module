import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverModule } from './driver/driver.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { TransferModule } from './transfer/transfer.module';
import { Driver } from './driver/driver.entity';
import { Vehicle } from './vehicle/vehicle.entity';
import { Transfer } from './transfer/transfer.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Driver, Vehicle, Transfer],
      synchronize: true,
    }),
    DriverModule,
    VehicleModule,
    TransferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
