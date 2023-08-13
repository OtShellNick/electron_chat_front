import { sendNotification } from './notify';

export default class SocketClient {
  private url: string;

  private socket: WebSocket | null;

  constructor(url: string) {
    this.url = url;
    this.socket = null;
  }

  public connect(token: string): void {
    this.socket = new WebSocket(`${this.url}?jwt=${token}`);
    this.socket.onopen = (): void => {
      console.log('Соединение установлено');
      sendNotification('notification', {
        type: 'success',
        message: 'Соединение установлено',
      });
    };
    this.socket.onmessage = this.handleMessage;
    this.socket.onclose = (): void => {
      console.log('Соединение разорвано');
    };
  }

  private handleMessage = (event: MessageEvent): void => {
    console.log('Получено сообщение от сервера:', event.data);
    // You can use `this` inside the method body if needed
    // For example, you can access other class properties or call other class methods using `this`
    this.someOtherMethod();
  };

  private someOtherMethod(): void {
    // ...
  }

  public sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
