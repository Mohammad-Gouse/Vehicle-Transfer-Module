import { Controller, Post, Get, Param, Body, Query, Delete } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferDto } from './transfer.dto';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  async create(@Body() createTransferDto: TransferDto) {
    return this.transferService.transferVehicle(createTransferDto);
  }

  // @Get()
  // findAll() {
  //   return this.transferService.findAll();
  // }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.transferService.findAll(page, limit);
  }

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<void> {
  //   return this.transferService.remove(+id);
  // }


  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.transferService.remove(id);
  }

  @Get('vehicle/:vehicleNumber')
  findByVehicle(@Param('vehicleNumber') vehicleNumber: string) {
    return this.transferService.findByVehicle(vehicleNumber);
  }
}
