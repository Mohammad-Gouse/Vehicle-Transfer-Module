import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from './transfer.entity';
import { Driver } from '../driver/driver.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { TransferDto } from './transfer.dto';

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


  async transferVehicle(transferData: TransferDto): Promise<Transfer> {
    const { vehicleId, fromDriverId, toDriverId, transferDate } = transferData;

    try {
      // Validate the input data
      if (!vehicleId || !toDriverId || !transferDate) {
        throw new BadRequestException('Missing required transfer data');
      }

      // Fetch entities from the database
      const fromDriver = fromDriverId ? await this.driverRepository.findOne({ where: { id: fromDriverId } }) : null;
      const toDriver = await this.driverRepository.findOne({ where: { id: toDriverId } });
      const vehicle = await this.vehicleRepository.findOne({ where: { id: vehicleId } });

      // Check if all entities exist
      if (fromDriverId && !fromDriver) {
        throw new NotFoundException(`Driver with ID ${fromDriverId} not found`);
      }
      if (!toDriver) {
        throw new NotFoundException(`Driver with ID ${toDriverId} not found`);
      }
      if (!vehicle) {
        throw new NotFoundException(`Vehicle with ID ${vehicleId} not found`);
      }

      // Create and save the transfer record
      const transfer = this.transferRepository.create({
        fromDriver,
        toDriver, // Assuming the new driver is the 'toDriver'
        vehicle,
        transferDate,
      });

      return await this.transferRepository.save(transfer);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error; // Re-throw known exceptions
      }
      // Handle unexpected errors
      console.error('Error during vehicle transfer:', error);
      throw new InternalServerErrorException('An unexpected error occurred while processing the transfer');
    }
  }

  // async findAll(): Promise<Transfer[]> {
  //   return this.transferRepository.find({ relations: ['fromDriver', 'toDriver', 'vehicle'] });
  // }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Transfer[]; total: number }> {
    const [data, total] = await this.transferRepository.findAndCount({
      relations: ['fromDriver', 'toDriver', 'vehicle'],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        updatedAt: 'DESC',
      },
    });

    return { data, total };
  }

  // async remove(id: number): Promise<void> {
  //   const vehicle = await this.findOne(id);
  //   await this.vehicleRepository.remove(vehicle);
  // }

  async remove(id: number): Promise<void> {
    const result = await this.transferRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Transer with ID ${id} not found`);
    }
  }

  async findByVehicle(vehicleNumber: string): Promise<Transfer[]> {
    const vehicle = await this.vehicleRepository.findOne({ where: { vehicleNumber }, relations: ['transfers'] });
    return vehicle ? vehicle.transfers : [];
  }
}
