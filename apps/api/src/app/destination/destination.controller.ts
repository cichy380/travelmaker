import { Controller, UseInterceptors, Post, Get, Put, Body, Param } from "@nestjs/common";
import { TransformInterceptor } from '../core/interceptor/transform.interceptor';
import { NotFoundInterceptor } from '../core/interceptor/not-found.interceptor';
import { Destination } from './destination.entity';
import { DestinationId, CreateDestinationDto, UpdateDestinationDto } from './dto/destination.dto';
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
  @UseInterceptors(NotFoundInterceptor)
  update(@Param('id') id: DestinationId, @Body() updateDestDto: UpdateDestinationDto): Promise<Destination> {
    return this.destService.update(id, updateDestDto);
  }
}
