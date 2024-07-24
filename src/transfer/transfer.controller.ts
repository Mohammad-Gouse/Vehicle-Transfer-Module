import { Controller, Post, Body, Get } from '@nestjs/common';
import { TransferService } from './transfer.service';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  transferVehicle(@Body('driverId') driverId: number, @Body('vehicleId') vehicleId: number) {
    return this.transferService.transferVehicle(driverId, vehicleId);
  }

  @Get()
  findAll() {
    return this.transferService.findAll();
  }
}
