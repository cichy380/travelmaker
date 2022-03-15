import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Destination } from './destination/destination.entity';
import { DestinationModule } from './destination/destination.module';
import { ConfigModule, ConfigService } from "@nestjs/config";



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('TYPEORM_URL'),
        port: configService.get('TYPEORM_PORT'),
        database: configService.get('TYPEORM_DATABASE'),
        entities: [ Destination ],
        synchronize: configService.get('TYPEORM_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
    DestinationModule,
  ],
})
export class AppModule {}
