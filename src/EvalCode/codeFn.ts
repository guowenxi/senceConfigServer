import { HttpService } from "@nestjs/axios";
import { commonData } from "@/util/util";
import { subscription } from "@/util/ws";
import config from '@/config/config';

import axios from "axios"
export class codeFn {
    httpService: HttpService;
    constructor(
    ) { }
    async LOADPOINT(id) {
        try {
            return new Promise(function (resolve) {
                let _value = null;
                for (const item of subscription.receiveData?.pointData) {
                    if (Number(item.id) == Number(id)) {
                        _value = item.value;
                        break;
                    }
                }
                console.log(`获取的值:${_value}`);
                setTimeout(() => {
                    resolve(_value)
                }, 30)
            })
        } catch (err) {
            return null;
        }
    }
    SETPOINTVALUE(id, value) {
        console.log("下发", value);
        const response = axios.request({
            url: `${config().sendUrl}/data_collect/point/issuedPoint`,
            method: "post",
            data: {
                pointId: Number(id),
                value: value
            }
        }).catch(function (err) {
            return err;
        });
        return null;
    }
    SLEEP(TIME) {
        return new Promise(function (res) {
            setTimeout(function () {
                res(null)
            }, TIME)
        })
    }
    SENDWARN(blockId) {
        return new Promise(function (res) {
            const response = axios.request({
                url: `${config().warnUrl}/project-config/system/insertSystemAlarmLogs`,
                method: "post",
                data: {
                    type: 1,
                    warnId: blockId,
                    pointId:"",
                }
            }).then(function(data){
                console.log('发送告警成功')
                res(blockId);
            }).catch(function (err) {
                res(blockId);
            });
        })
    }
    RESETWARNACTION(olist, nlist) {
        if(olist.length<=0){
            return ;
        }

        let _ids = [];
        olist.map((item) => {
            if (nlist.indexOf(item.warnId) === -1) {
                _ids.push(item.warnId)
            }
        })
    
        const response = axios.request({
            url: `${config().warnUrl}/project-config/system/insertSystemAlarmLogs`,
            method: "post",
            data: {
                type: 2,
                warnId: _ids.join(','),
                pointId:"",
            }
        }).then(function(data){ 
            console.log('重置告警')
        }).catch(function (err) {
            return err;
        });
        return null;
    }

}