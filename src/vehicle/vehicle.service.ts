import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleDto } from './vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}
 
  async create(createVehicleDto: VehicleDto): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create(createVehicleDto);
    return this.vehicleRepository.save(vehicle);
  }

  // async findAll(): Promise<Vehicle[]> {
  //   return this.vehicleRepository.find({ relations: ['transfers'] });
  // }

  
  async findAll(
    page: number = 1,
    limit: number = 10,
    filter?: { vehicleType?: string; vehicleNumber?: string }
  ): Promise<{ data: Vehicle[]; total: number }> {
    const [data, total] = await this.vehicleRepository.findAndCount({
      where: {
        vehicleType: filter?.vehicleType ? ILike(`%${filter.vehicleType}%`) : undefined,
        vehicleNumber: filter?.vehicleNumber ? ILike(`%${filter.vehicleNumber}%`) : undefined,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id }, relations: ['transfers'] });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }


  async update(id: number, updateVehicleDto: VehicleDto): Promise<Vehicle> {
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
