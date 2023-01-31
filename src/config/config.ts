export default () => ({
  sendUrl: "http://192.168.1.244:8001",
  //告警记录接口ip地址
  warnUrl: "http://192.168.2.244:1124",
  axiosUrl: "http://192.168.1.244:8001",
  wsUrl: "ws://192.168.1.244:15420/ws/socket",
  port: parseInt(process.env.PORT, 10) || 30000,
  //上传文件的路径
  filePath: "fileStore",
  database: {
    // host: process.env.DATABASE_HOST,
    host: '192.168.1.244',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: 'test',
    password: 'Jiayi123',
    database: 'jy_base',
    // username: 'root',
    // password: 'root',
    // database: 'nest',
    autoLoadEntities: true, //是否将自动加载实体
    keepConnectionAlive: true, //在应用程序关闭后连接不会关闭
    synchronize: true,
  }
});
