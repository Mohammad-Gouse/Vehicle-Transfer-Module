import { Controller, Get, Post, Body, Param, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('certificates', 2))
  create(@Body() createVehicleDto: any, @UploadedFiles() files: any[]) {
    const pucCertificate = files.find(file => file.fieldname === 'pucCertificate')?.buffer;
    const insuranceCertificate = files.find(file => file.fieldname === 'insuranceCertificate')?.buffer;
    const vehicleData = { ...createVehicleDto, pucCertificate, insuranceCertificate };
    return this.vehicleService.create(vehicleData);
  }

  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.vehicleService.findOne(id);
  }
}
