// import { Injectable  } from '@nestjs/common';
// import { Connection,Repository, TreeRepository, getManager } from 'typeorm';
// import { InjectRepository  } from '@nestjs/typeorm';
// import { UserManagerUser } from '@modules/entities/UserManagerUser';
// import { UserDepartment } from '@modules/entities/UserDepartment';
// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(UserManagerUser)
//     private UserManagerUser: Repository<UserManagerUser>,
//     @InjectRepository(UserDepartment)
//     private UserDepartment: Repository<UserDepartment>,
//     private readonly connection: Connection,
//   ) {}

//   async getUserList(query): Promise<any>  {
//     const { pageNo , pageSize } = query;
//     let instance = await this.UserManagerUser.find({
//       relations:['departmentLists']
//     });
//     return instance;
//     // const [ instance , instanceCount] = await this.repository.findAndCount({
//     //   where:{
//     //     managerId:query.id
//     //   },
//     //   skip: pageNo ?  ((pageNo-1)*pageSize) : 0 ,
//     //   take: pageSize  ? (pageNo*pageSize) : 999,
//     // });
//     // return  {
//     //   data:instance,
//     //   pageNo:Number(pageNo),
//     //   pageSize:Number(pageSize),
//     //   total : instanceCount
//     // } ;
//   }
// //https://blog.csdn.net/weixin_44828005/article/details/116211712
//   async addUserList(body): Promise<any>  {
//     if(typeof(body.departmentLists) === 'string'){
//       body.departmentLists.split(',').map(function(item,idx){
        
//       })
//     }
//     this.UserDepartment
//     const manager = getManager();
//       // const _UserDepartment = new UserDepartment();
//       // _UserDepartment.job = "测试";
//       // await manager.save(_UserDepartment);
//       debugger
//       const _UserManagerUser = new UserManagerUser();
//       _UserManagerUser.name = "John";
//       _UserManagerUser.accountStatus = 1;
//       _UserManagerUser.managerId = 1;
//       // _UserManagerUser.departmentLists = [1,2];
//       const instance = await manager.save(_UserManagerUser);
//       // manager.save()
//     // const instance = await this.repository.save({
//     //   ...body
//     // });
//     return  instance ;
//   }

 

// }
