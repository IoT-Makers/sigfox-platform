import {BootScript} from '@mean-expert/boot-script';

interface User {
  id: string;
  email: string;
  connected: boolean;
  updateAttributes: Function;
}
interface Socket { token: { userId: string }; }
@BootScript()
class OnDisconnect {
  constructor(public app: any) {
    app.on('socket-disconnect', (socket: Socket) => this.handlerDisconnected(socket));
  }
  handlerDisconnected(socket: Socket): void {
    if (socket.token && socket.token.userId) {
      const userId = `${ socket.token.userId }`;
      this.app.models.user.findById(userId, (err: Error, user: User) => {
        if (user) {
          console.log('A user has been disconnected:', user.email);
          user.updateAttributes({ connected: false });
        }
      });
    }
  }
}
module.exports = OnDisconnect;
