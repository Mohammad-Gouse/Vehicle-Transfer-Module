import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Driver } from './driver.entity';
import { DriverDto } from './driver.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  async create(driverData: DriverDto): Promise<Driver> {
    const driver = this.driverRepository.create(driverData);
    return this.driverRepository.save(driver);
  }

  // async findAll(): Promise<Driver[]> {
  //   return this.driverRepository.find();
  // }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter?: { name?: string; phoneNumber?: string }
  ): Promise<{ data: Driver[]; total: number }> {
    const [data, total] = await this.driverRepository.findAndCount({
      where: {
        name: filter?.name ? ILike(`%${filter.name}%`) : undefined,
        phoneNumber: filter?.phoneNumber ? ILike(`%${filter.phoneNumber}%`) : undefined,
      },
      order: { updatedAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: number): Promise<Driver> {
    const driver = await this.driverRepository.findOne({ where: { id } });
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }



  async update(id: number, updateDriverDto: DriverDto): Promise<Driver> {
    const existingDriver = await this.driverRepository.findOne({ where: { id } });

    if (!existingDriver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }

    const updatedDriver = { ...existingDriver, ...updateDriverDto };


    return this.driverRepository.save(updatedDriver);
  }

  async remove(id: number): Promise<void> {
    const result = await this.driverRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
  }
}
