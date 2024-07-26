import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  async create(driverData: any): Promise<Driver[]> {
    const driver = this.driverRepository.create(driverData);
    return this.driverRepository.save(driver);
  }

  async findAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

  async findOne(id: number): Promise<Driver> {
    const driver = await this.driverRepository.findOne({ where: { id } });
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }

  // async update(id: number, updateDriverDto: any): Promise<Driver> {
  //   console.log(updateDriverDto)
  //   const driver = await this.driverRepository.preload({
  //     id,
  //     ...updateDriverDto,
  //   });

  //   console.log(driver, id)

  //   if (!driver) {
  //     throw new NotFoundException(`Driver with ID ${id} not found`);
  //   }

  //   return this.driverRepository.save(driver);
  // }

  async update(id: number, updateDriverDto: any): Promise<Driver> {
    const existingDriver = await this.driverRepository.findOne({ where: { id } });

    if (!existingDriver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }

    // Merge the existing driver with the update data
    const updatedDriver = { ...existingDriver, ...updateDriverDto };

    console.log('Updated Driver Data:', updatedDriver);

    return this.driverRepository.save(updatedDriver);
  }

  async remove(id: number): Promise<void> {
    const result = await this.driverRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
  }
}
