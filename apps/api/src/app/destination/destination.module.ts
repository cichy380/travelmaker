import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';
import { Destination } from './destination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Destination])],
  providers: [DestinationService],
  controllers: [DestinationController],
})
export class DestinationModule {}
