import { Controller, Post, Get, Param, Body, UploadedFile, UseInterceptors, Put, Delete, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DriverService } from './driver.service';
import { DriverDto } from './driver.dto';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePhoto'))
  async create(
    @Body() createDriverDto: DriverDto,
    @UploadedFile() file:Express.Multer.File
  ) {
    const driverData = {
      ...createDriverDto,
      profilePhoto: file?.buffer,
    };
    return this.driverService.create(driverData);
  }


  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('name') name?: string,
    @Query('phoneNumber') phoneNumber?: string
  ) {
    const filter = { name, phoneNumber };
    return this.driverService.findAll(page, limit, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.driverService.findOne(id);
  }


  @Put(':id')
  @UseInterceptors(FileInterceptor('profilePhoto'))
  async update(
    @Param('id') id: number,
    @Body() updateDriverDto: DriverDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const driverData = {
      ...updateDriverDto,
      profilePhoto: file?.buffer,
    };
    return this.driverService.update(id, driverData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.driverService.remove(id);
  }
}
