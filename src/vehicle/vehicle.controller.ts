import { Controller, Post, Get, Param, Body, Put, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { VehicleService } from './vehicle.service';

type MulterFile = Express.Multer.File;

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'pucCertificate', maxCount: 1 },
    { name: 'insuranceCertificate', maxCount: 1 },
  ], { storage: multer.memoryStorage() }))
  async create(
    @Body() createVehicleDto: any,
    @UploadedFiles() files: { pucCertificate?: MulterFile[], insuranceCertificate?: MulterFile[] }
  ) {
    const vehicleData = {
      ...createVehicleDto,
      pucCertificate: files.pucCertificate ? files.pucCertificate[0].buffer : null,
      insuranceCertificate: files.insuranceCertificate ? files.insuranceCertificate[0].buffer : null,
    };
    return this.vehicleService.create(vehicleData);
  }

  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.vehicleService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'pucCertificate', maxCount: 1 },
    { name: 'insuranceCertificate', maxCount: 1 },
  ], { storage: multer.memoryStorage() }))
  async update(
    @Param('id') id: any,
    @Body() updateVehicleDto: any,
    @UploadedFiles() files: { pucCertificate?: MulterFile[], insuranceCertificate?: MulterFile[] }
  ) {
    const vehicleData = {
      ...updateVehicleDto,
      pucCertificate: files.pucCertificate ? files.pucCertificate[0].buffer : null,
      insuranceCertificate: files.insuranceCertificate ? files.insuranceCertificate[0].buffer : null,
    };
    return this.vehicleService.update(id, vehicleData);
  }

  @Delete(':id')
  async remove(@Param('id') id: any) {
    return this.vehicleService.remove(id);
  }
}
