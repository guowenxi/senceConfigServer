import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { service } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Editor]),
  ],
  controllers: [AppController],
  providers: [service],
})
export class GraphQLController {}
