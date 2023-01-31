// import { Injectable } from '@nestjs/common';
// import { Repository, TreeRepository, getManager } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// // import { UserManagerDepartment } from '@/modules/entities/UserManagerDepartment';
// @Injectable()
// export class service {
//   constructor(
//     @InjectRepository(UserManagerDepartment)
//     private TreeRepository: TreeRepository<UserManagerDepartment>,
//   ) {}

//   async getDepartmentList(query): Promise<any> {
//     const instance = await this.TreeRepository.findTrees();
//     return instance;
//   }

//   async addDepartmentList(data): Promise<any> {
//     let instance;
//     //判断是否传入parentId
//     if (data.parentId) {
//       instance = await this.TreeRepository.findOne(data.parentId);
//       if (!instance) {
//         return;
//       }
//     }
//     //对tree进行新增
//     const manager = getManager();
//     const childrenItem = new UserManagerDepartment();
//     childrenItem.name = data.name;
//     childrenItem.parent = instance || null;
//     await manager.save(childrenItem);
//     return instance;
//   }

//   async updateDepartmentList(data): Promise<any> {
//     let instance;
//     if (data.id) {
//       instance = await this.TreeRepository.findOne(data.id);
//       if (!instance) {
//         //传递的id不存在
//         return;
//       }
//     }
//     await this.TreeRepository.update(Number(data.id), {
//       ...data,
//     });
//     return;
//   }

//   async deleteDepartmentList(data): Promise<any> {
//     await this.TreeRepository.delete(data.id);
//     return data.id;
//   }
// }
