import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  private socket: Socket


  ids: string[] = []

  constructor() {

  
    this.socket = io("https://gms.pesatto.com", {
      
      path: '/socket.io',
      transports: ['polling','websocket'],
      secure: true,
    });

    this.socket.on('connect', () => {
      this.join(this.ids);
    });

    this.socket.on('disconnect', () => {
    });
  }

  connect() {
    this.socket.connect()
  }

  join(ids: string[]) {
    this.ids = ids
    this.socket.emit("get", { units: ids })
  }

  public socket_listener(listener: (data: any) => void) {
    this.socket.on('update', listener);
  }

  disconnect() {
    this.socket.removeAllListeners();
    this.socket.disconnect()
  }
}
