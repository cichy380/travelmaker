import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Weekday } from '../destination.entity';

export type DestinationId = string;

export class CreateDestinationDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsEnum(Weekday)
  @IsNotEmpty()
  readonly day: Weekday;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly order: number;
}

export class UpdateDestinationDto extends CreateDestinationDto {
  readonly id: DestinationId;
}
