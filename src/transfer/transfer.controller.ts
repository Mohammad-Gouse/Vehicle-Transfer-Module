import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { TransferService } from './transfer.service';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  async create(@Body() createTransferDto: any) {
    return this.transferService.transferVehicle(createTransferDto);
  }

  @Get()
  findAll() {
    return this.transferService.findAll();
  }

  @Get('vehicle/:vehicleNumber')
  findByVehicle(@Param('vehicleNumber') vehicleNumber: string) {
    return this.transferService.findByVehicle(vehicleNumber);
  }
}
