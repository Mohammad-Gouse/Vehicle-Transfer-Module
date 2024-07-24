import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { Driver } from './driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  providers: [DriverService],
  controllers: [DriverController],
})
export class DriverModule {}
