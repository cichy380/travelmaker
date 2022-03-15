import { Controller, Get } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { Destination } from './destination.entity';

@Controller('destinations')
export class DestinationController {
  constructor(private readonly destService: DestinationService) {}

  @Get()
  findAll(): Promise<Destination[]> {
    return this.destService.findAll();
  }
}
