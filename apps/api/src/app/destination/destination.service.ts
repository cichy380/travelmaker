import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Destination } from './destination.entity';
import { CreateDestinationDto } from './dto/create-destination.dto';


@Injectable()
export class DestinationService {
  constructor(@InjectRepository(Destination) private readonly destRepository: Repository<Destination>) {
  }

  async create(createDestination: Omit<CreateDestinationDto, 'order'>): Promise<Destination> {
    const allDestinationsCount = await this.destRepository.count();
    const createDestinationDto: CreateDestinationDto = { ...createDestination, order: allDestinationsCount }
    return this.destRepository.save(createDestinationDto);
  }

  async findAll(): Promise<Destination[]> {
    return this.destRepository.find();
  }

  async findOne(id: string): Promise<Destination> {
    return this.destRepository.findOne(id);
  }
}
