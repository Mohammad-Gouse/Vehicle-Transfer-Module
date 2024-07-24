import { Controller, Get, Post, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DriverService } from './driver.service';
import { Express } from 'express';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePhoto'))
  create(@Body() createDriverDto: any, @UploadedFile() file: any) {
    const driverData = { ...createDriverDto, profilePhoto: file?.buffer };
    return this.driverService.create(driverData);
  }

  @Get()
  findAll() {
    return this.driverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.driverService.findOne(id);
  }
}
