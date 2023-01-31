import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '@/modules/entities/File';
//调用nodejs自带的加密解密库
// import crypto from 'crypto';
const crypto = require('crypto');
//MD5、SHA1、SHA256 和 SHA512
@Injectable()
export class service {
  constructor(
    @InjectRepository(File)
    private UserRepository: Repository<File>,
  ) {}
  async uploadFile(data): Promise<any> {
    let instance ;
    //将文件加密成唯一hash
    const hash = new crypto.createHash('md5');
    hash.update(data.buffer);
    // 表示加密之后的结果
    /**
     * * latin1 ASCII 扩展
     * * ex 十六进制
     * * base64 base64 编码方式
     */
    const fileHash = hash.digest('hex');
    //判断表里是否存在
    const cacheFile = await this.UserRepository.findOne({
      where: { fileId: fileHash },
    });
    if (!cacheFile) {
      instance = await this.UserRepository.save({
        fileId: fileHash,
        fileName: data.originalname,
        fileType:data.fileType
      });
    }
    return {
      fileId:instance ? instance.fileId  : cacheFile.fileId,
      cache:instance ? false : true,
    };
  }
  
  async loadFile(data): Promise<any> {
    return await this.UserRepository.findOne({
      where: { fileId: data.fileId },
    });
  }
}
