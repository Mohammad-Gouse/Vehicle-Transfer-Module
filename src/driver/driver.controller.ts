import { Controller, Post, Get, Param, Body, UploadedFile, UseInterceptors, Put, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DriverService } from './driver.service';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePhoto'))
  async create(
    @Body() createDriverDto: any,
    @UploadedFile() file:any
  ) {
    const driverData = {
      ...createDriverDto,
      profilePhoto: file?.buffer,
    };
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

  // @Put(':id')
  // @UseInterceptors(FileInterceptor('profilePhoto'))
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateDriverDto: any,
  //   @UploadedFile() file: any
  // ) {
  //   const driverData = {
  //     ...updateDriverDto,
  //     profilePhoto: file?.buffer,
  //   };
  //   return this.driverService.update(id, driverData);
  // }

  @Put(':id')
  @UseInterceptors(FileInterceptor('profilePhoto'))
  async update(
    @Param('id') id: number,
    @Body() updateDriverDto: any,
    @UploadedFile() file: any
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
