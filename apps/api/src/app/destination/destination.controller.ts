import { Body, Controller, Get, Param, Post, Put, UseFilters, UseInterceptors } from '@nestjs/common';
import { BadRequestExceptionFilter } from '../core/filter/bad-request-exception.filter';
import { TransformInterceptor } from '../core/interceptor/transform.interceptor';
import { NotFoundInterceptor } from '../core/interceptor/not-found.interceptor';
import { Destination } from './destination.entity';
import { CreateDestinationDto, DestinationId, UpdateDestinationDto } from './dto/destination.dto';
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
  findOne(@Param('id') id: DestinationId): Promise<Destination> {
    return this.destService.findOne(id);
  }

  @Put(':id')
  @UseFilters(BadRequestExceptionFilter)
  @UseInterceptors(NotFoundInterceptor)
  update(@Param('id') id: DestinationId, @Body() updateDestDto: UpdateDestinationDto): Promise<Destination> {
    return this.destService.update(id, updateDestDto);
  }
}
