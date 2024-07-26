import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(vehicleData: any): Promise<Vehicle[]> {
    console.log(`serve vehicle ${vehicleData}`)
    const vehicle = this.vehicleRepository.create(vehicleData);
    return this.vehicleRepository.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    console.log(`serve vehicle`)
    return this.vehicleRepository.find();
  }

  async findOne(vehicleNumber: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({ where: { vehicleNumber } });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with Number ${vehicleNumber} not found`);
    }
    return vehicle;
  }

  async update(vehicleNumber: string, updateVehicleDto: any): Promise<Vehicle> {
    const existingVehicle = await this.vehicleRepository.findOne({ where: { vehicleNumber } });

    if (!existingVehicle) {
      throw new NotFoundException(`Vehicle with Number ${vehicleNumber} not found`);
    }

    const updatedVehicle = { ...existingVehicle, ...updateVehicleDto };

    return this.vehicleRepository.save(updatedVehicle);
  }

  async remove(vehicleNumber: string): Promise<void> {
    const result = await this.vehicleRepository.delete(vehicleNumber);
    if (result.affected === 0) {
      throw new NotFoundException(`Vehicle with Number ${vehicleNumber} not found`);
    }
  }
}
