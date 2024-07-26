import { Controller, Post, Get, Param, Body, Put, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer'; // Import multer
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('pucCertificate')
  )
  async create(
    @Body() createVehicleDto: any,
    @UploadedFile('pucCertificate') pucFile: Express.Multer.File
  ) {
    const vehicleData = {
      ...createVehicleDto,
      pucCertificate: pucFile?.buffer
    };
    return this.vehicleService.create(vehicleData);
  }

  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':vehicleNumber')
  findOne(@Param('vehicleNumber') vehicleNumber: string) {
    return this.vehicleService.findOne(vehicleNumber);
  }

  @Put(':vehicleNumber')
  @UseInterceptors(
    FileInterceptor('pucCertificate', { storage: multer.memoryStorage() }),
    FileInterceptor('insuranceCertificate', { storage: multer.memoryStorage() })
  )
  async update(
    @Param('vehicleNumber') vehicleNumber: string,
    @Body() updateVehicleDto: any,
    @UploadedFile('pucCertificate') pucFile: Express.Multer.File,
    @UploadedFile('insuranceCertificate') insuranceFile: Express.Multer.File
  ) {
    const vehicleData = {
      ...updateVehicleDto,
      pucCertificate: pucFile?.buffer
    };
    return this.vehicleService.update(vehicleNumber, vehicleData);
  }

  @Delete(':vehicleNumber')
  async remove(@Param('vehicleNumber') vehicleNumber: string) {
    return this.vehicleService.remove(vehicleNumber);
  }
}
