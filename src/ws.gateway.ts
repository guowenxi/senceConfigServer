import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import * as WebSocket from 'ws';
import TCP_subscription from "@util/TCP";
@WebSocketGateway(3002)
export class WsGateway {
  @SubscribeMessage('open_tcp')
  async open_tcp(@MessageBody() data: any): Promise<any>  {
    return new Promise((resolve)=>{
      TCP_subscription.newTCP(data,()=>{
        this.on_tcp('')
        resolve("连通")
      })
    })
  }
  @SubscribeMessage('send_tcp')
  async send_tcp(@MessageBody() data: any): Promise<any>  {
    const res = await TCP_subscription.TCPemit(data);
    return res;
  }
  @SubscribeMessage('on_tcp')
  async on_tcp(@MessageBody() data: any): Promise<any>  {
    TCP_subscription.TCPon((data)=>{
      let buffer = data.toString('hex');
      console.log(buffer)
      TCP_subscription.ws_client.send(JSON.stringify(buffer));
    })
  }
}