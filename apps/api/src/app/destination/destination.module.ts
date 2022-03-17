import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from '../shared/response.service';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';
import { Destination } from './destination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Destination])],
  providers: [DestinationService, ResponseService],
  controllers: [DestinationController],
})
export class DestinationModule {}
