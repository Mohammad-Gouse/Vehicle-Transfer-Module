import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: any): Promise<Vehicle[]> {
    const vehicle = this.vehicleRepository.create(createVehicleDto);
    return this.vehicleRepository.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find({ relations: ['transfers'] });
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id }, relations: ['transfers'] });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

  // async update1(id: number, updateVehicleDto: any): Promise<Vehicle> {
  //   const vehicle = await this.vehicleRepository.preload({
  //     id,
  //     ...updateVehicleDto,
  //   });

  //   if (!vehicle) {
  //     throw new NotFoundException(`Vehicle with ID ${id} not found`);
  //   }

  //   return this.vehicleRepository.save(vehicle);
  // }

  async update(id: number, updateVehicleDto: any): Promise<Vehicle> {
    const existingVehicle = await this.vehicleRepository.findOne({ where: { id } });

    if (!existingVehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    const updatedVehicle = { ...existingVehicle, ...updateVehicleDto };

    return this.vehicleRepository.save(updatedVehicle);
  }

  async remove(id: number): Promise<void> {
    const vehicle = await this.findOne(id);
    await this.vehicleRepository.remove(vehicle);
  }
}
