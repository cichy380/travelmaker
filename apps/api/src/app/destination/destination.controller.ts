import { Controller, Get, Param } from "@nestjs/common";
import { ResponseData } from '../shared/response.service';
import { DestinationService } from './destination.service';
import { Destination } from './destination.entity';

@Controller('destinations')
export class DestinationController {
  constructor(private readonly destService: DestinationService) {}

  @Get()
  findAll(): Promise<ResponseData<Destination[]>> {
    return this.destService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResponseData<Destination[]>> {
    return this.destService.findOne(id);
  }
}
