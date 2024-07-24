import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from './transfer.entity';
import { Driver } from '../driver/driver.entity';
import { Vehicle } from '../vehicle/vehicle.entity';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async transferVehicle(driverId: any, vehicleId: any): Promise<Transfer> {
    const driver = await this.driverRepository.findOne(driverId);
    const vehicle = await this.vehicleRepository.findOne(vehicleId);

    if (!driver || !vehicle) {
      throw new Error('Driver or Vehicle not found');
    }

    const transfer = this.transferRepository.create({
      driver,
      vehicle,
      transferDate: new Date(),
    });

    return this.transferRepository.save(transfer);
  }

  findAll(): Promise<Transfer[]> {
    return this.transferRepository.find({ relations: ['driver', 'vehicle'] });
  }
}
