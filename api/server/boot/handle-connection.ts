import { BootScript } from '@mean-expert/boot-script';

interface User {
  id: string;
  email: string;
  connected: boolean;
  updateAttributes: Function;
}
interface Socket { token: { userId: string }; }
@BootScript()
class OnConnected {
  constructor(public app: any) {
    //app.on('socket-authenticated', (socket: Socket) => this.handlerConnected(socket));
  }
  handlerConnected(socket: Socket): void {
    if (socket.token && socket.token.userId) {
      const userId = `${ socket.token.userId }`;
      this.app.models.user.findById(userId, (err: Error, user: User) => {
        console.log('A user has connected:', user.email);
        user.updateAttributes({ connected: true });
      });
    }
  }
}
module.exports = OnConnected;
