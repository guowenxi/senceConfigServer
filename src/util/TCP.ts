/**
* 构建TCP客户端
*/
var ws = require("ws");
/* 引入net模块 */
var net = require("net");
/* 创建TCP客户端 */

// TCP_sock.on("open", function () {
//     console.log("connect success !!!!");
// });

// TCP_sock.on("error", function (err) {
//     console.log("error: ", err);
// });

// TCP_sock.on("close", function () {
//     console.log("close");
// });

// TCP_sock.on("message", function (data, isBinary) {
//     const _ = JSON.parse(data.toString('utf8'));
//     debugger
// });

// /* 设置连接的服务器 */
// client.connect(502, '192.168.1.244', function () {
//     debugger
//     console.log("连接成功...");

//     /* 向服务器发送数据 */
//     client.write("0");
// })

// /* 监听服务器传来的data数据 */
// client.on("data", function (data) {
//     console.log("the data of server is " + data);
// })

// /* 监听end事件 */
// client.on("end", function () {
//     console.log("data end");
// })

export default {
    ws_client: null,
    TCP_client: null,
    newTCP: function ({port , ip},fn) {
        this.TCP_client = net.Socket();
        /* 设置连接的服务器 */
        this.TCP_client.connect(port, ip,fn)
        this.TCPon(()=>{});
        return this.TCP_client;
    },
    TCPemit:async function(data){
        return new Promise((resolve)=>{
            //将一个十六进制报文转为字符数组
            var strs = data.split(" ");
            //每个字符加上0x
            for (let i = 0; i < strs.length; i++) {
                strs[i] = "0x" + strs[i];
            }
            console.log('发送内容:' + strs);
            //将数组放到buffer
            let buffer = Buffer.from(new Buffer(strs));
            console.log('发送内容:' + buffer);
            /* 向服务器发送数据 */
            this.TCP_client.write(buffer)
            this.TCPon(()=>{
                let buffer = data.toString('hex');
                resolve(buffer)
            })
          })
    },
    TCPon:async function(fn){
        this.TCP_client.on('data',fn)
    },
}

