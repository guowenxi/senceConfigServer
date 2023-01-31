import { TypeOrmModule } from '@nestjs/typeorm';
import {  ConfigService } from '@nestjs/config';
// const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;
export const mysql =  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        autoLoadEntities: true,
        synchronize: true,
        ...configService.get<any>('database'),
        // namingStrategy: new SnakeNamingStrategy()
      }),
});