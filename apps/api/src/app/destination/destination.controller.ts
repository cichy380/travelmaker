import { Controller, UseInterceptors, Post, Get, Body, Param } from '@nestjs/common';
import { TransformInterceptor } from '../core/interceptor/transform.interceptor';
import { NotFoundInterceptor } from '../core/interceptor/not-found.interceptor';
import { Destination } from './destination.entity';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { DestinationService } from './destination.service';


@Controller('destinations')
@UseInterceptors(TransformInterceptor)
export class DestinationController {
  constructor(private readonly destService: DestinationService) {}

  @Post()
  create(@Body() createDest: Omit<CreateDestinationDto, 'order'>): Promise<Destination> {
    return this.destService.create(createDest);
  }

  @Get()
  findAll(): Promise<Destination[]> {
    return this.destService.findAll();
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  findOne(@Param('id') id: string): Promise<Destination> {
    return this.destService.findOne(id);
  }
}
