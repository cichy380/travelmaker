import { Controller, UseInterceptors, Post, Get, Body, Param } from '@nestjs/common';
import { TransformInterceptor } from '../core/interceptor/transform.interceptor';
import { DestinationService } from './destination.service';
import { Destination } from './destination.entity';
import { NotFoundInterceptor } from '../core/interceptor/not-found.interceptor';


@Controller('destinations')
@UseInterceptors(TransformInterceptor)
export class DestinationController {
  constructor(private readonly destService: DestinationService) {}

  @Get()
  findAll(): Promise<Destination[]> {
    return this.destService.findAll();
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  findOne(@Param('id') id: string): Promise<Destination[]> {
    return this.destService.findOne(id);
  }
}
