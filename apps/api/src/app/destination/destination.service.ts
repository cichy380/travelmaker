import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { Destination } from './destination.entity';
import { DestinationId, CreateDestinationDto, UpdateDestinationDto } from './dto/destination.dto';


@Injectable()
export class DestinationService {
  constructor(@InjectRepository(Destination) private readonly destRepository: MongoRepository<Destination>) {
  }

  async create(createDestDtoWithoutOrder: CreateDestinationDto): Promise<Destination> {
    const allDestinationsCount = await this.destRepository.count();
    const createDestinationDto: CreateDestinationDto = { ...createDestDtoWithoutOrder, order: allDestinationsCount };
    return this.destRepository.save(createDestinationDto);
  }

  async findAll(): Promise<Destination[]> {
    return this.destRepository.find();
  }

  async findOne(id: DestinationId): Promise<Destination> {
    return this.destRepository.findOne(id);
  }

  async update(id: DestinationId, updateDestinationDto: UpdateDestinationDto): Promise<Destination> | undefined {
    const result: UpdateResult = await this.destRepository.update(id, updateDestinationDto);
    return result.raw.matchedCount === 1 ? this.findOne(id) : undefined;
  }

  async changeOrder(ids: DestinationId[]): Promise<Destination[]> {
    const destinations: Destination[] = await this.destRepository.findByIds(ids);
    for (const destination of destinations) {
      const id = destination.id.toString();
      destination.order = ids.indexOf(id);
      await this.destRepository.update(id, destination);
    }
    return destinations;
  }
}
