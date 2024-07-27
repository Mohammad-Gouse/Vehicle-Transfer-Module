import { IsString, IsNotEmpty, IsOptional, IsByteLength, MinLength } from 'class-validator';

export class VehicleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'vehicleNumber must be at least 8 characters long',
  })
  vehicleNumber: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'vehicleType must be at least 3 characters long',
  })
  vehicleType: string;

  @IsOptional()
  pucCertificate?: Buffer;

  @IsOptional()
  insuranceCertificate?: Buffer;
}
