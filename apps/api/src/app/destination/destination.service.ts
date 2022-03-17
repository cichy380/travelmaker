import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseService, ResponseData } from '../shared/response.service';
import { Destination } from './destination.entity';

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private readonly destRepository: Repository<Destination>,
    private readonly responseService: ResponseService,
  ) {}

  async findAll(): Promise<ResponseData<Destination[]>> {
    return this.responseService.createResponse(
      this.destRepository.find()
    );
  }
}
