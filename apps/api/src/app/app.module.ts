import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environment } from '../environments/environment';
import { Destination } from './destination/destination.entity';
import { DestinationModule } from './destination/destination.module';



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
        synchronize: !environment.production,
      }),
      inject: [ConfigService],
    }),
    DestinationModule,
  ],
})
export class AppModule {}
