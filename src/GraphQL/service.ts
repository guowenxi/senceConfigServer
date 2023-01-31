import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class service {
  constructor(
    // @InjectRepository(Editor)
    // private UserRepository: Repository<Editor>,
  ){}
  async getEditor(data): Promise<any>  {

  }
}
