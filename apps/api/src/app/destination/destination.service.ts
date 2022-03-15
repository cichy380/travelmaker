import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Destination } from './destination.entity';

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private readonly destRepository: Repository<Destination>,
  ) {}

  async findAll(): Promise<Destination[]> {
    return this.destRepository.find();
  }
}
