import config from '@/config/config';
import { io } from "socket.io-client";
var ws = require("ws");
// url ws://127.0.0.1:6080
// 创建了一个客户端的socket,然后让这个客户端去连接服务器的socket
var sock = new ws(config().wsUrl);
sock.on("open", function () {
    console.log("connect success !!!!");
});
 
sock.on("error", function(err) {
    console.log("error: ", err);
});
 
sock.on("close", function() {
    console.log("close");
});

sock.on("message", function(data,isBinary) {
   const _ = JSON.parse(data.toString('utf8'));
//    console.warn(_);
   subscription.receiveData = _;
});


export const subscription = {
    sendData: { "pointIds": null, "moduleIds": null, type: 'getModuleAndPoint' },
    state: false,
    socketList: [],
    cronList:{},
    receiveData: {
        pointData: [],
        moduleData: [],
    },
    save: function (list) {
        this.socketList = list;
        this.emit();
    },
    addCron: function (cron) {
        this.cronList[cron.name] = cron.cronIds;
    },
    removeCron: function (name) {
        delete this.cronList[name];
        this.emit();
    },
    push: function (id) {
        this.socketList = this.socketList.concat(id);
        this.socketList = Array.from(new Set(this.socketList));
    },
    remove: function (id) {
        this.socketList = [];
        this.emit();
    },
    emit: function () {
        let ids = [];
        for(const key in this.cronList){
            if(this.cronList[key].length>0)
            ids = ids.concat(this.cronList[key]);
        }

        ids = Array.from(new Set(ids));
        this.sendData['pointIds'] = ids;
        sock.send(JSON.stringify(this.sendData));
    },
}
