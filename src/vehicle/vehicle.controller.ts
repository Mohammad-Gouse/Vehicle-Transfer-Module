import { Controller, Post, Get, Param, Body, Put, Delete, UploadedFiles, UseInterceptors, Query } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { VehicleService } from './vehicle.service';
import { VehicleDto } from './vehicle.dto';

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
    @Body() createVehicleDto: VehicleDto,
    @UploadedFiles() files: { pucCertificate?: MulterFile[], insuranceCertificate?: MulterFile[] }
  ) {
    const vehicleData = {
      ...createVehicleDto,
      pucCertificate: files.pucCertificate ? files.pucCertificate[0].buffer : null,
      insuranceCertificate: files.insuranceCertificate ? files.insuranceCertificate[0].buffer : null,
    };
    return this.vehicleService.create(vehicleData);
  }

  // @Get()
  // findAll() {
  //   return this.vehicleService.findAll();
  // }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('vehicleType') vehicleType?: string,
    @Query('vehicleNumber') vehicleNumber?: string
  ) {
    const filter = { vehicleType, vehicleNumber };
    return this.vehicleService.findAll(page, limit, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.vehicleService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'pucCertificate', maxCount: 1 },
    { name: 'insuranceCertificate', maxCount: 1 },
  ], { storage: multer.memoryStorage() }))
  async update(
    @Param('id') id: number,
    @Body() updateVehicleDto: VehicleDto,
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
  async remove(@Param('id') id: number) {
    return this.vehicleService.remove(id);
  }
}
