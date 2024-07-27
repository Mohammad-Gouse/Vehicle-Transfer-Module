import { IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class TransferDto {
  @IsInt()
  @IsNotEmpty()
  fromDriverId: number;

  @IsInt()
  @IsNotEmpty()
  toDriverId: number;

  @IsInt()
  @IsNotEmpty()
  vehicleId: number;

  @IsDateString()
  @IsNotEmpty()
  transferDate: Date;
}
