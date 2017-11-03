/*
import { BootScript } from '@mean-expert/boot-script';

interface Users {
  id: string,
  connected: boolean;
  updateAttributes: Function;
}
interface Socket { token: { userId: string } }
@BootScript()
class OnDisconnect {
  constructor(public app: any) {
    app.on('socket-disconnect', (socket: Socket) => this.handler(socket));
  }
  handler(socket: Socket): void {
    if (socket.token && socket.token.userId) {
      let userId: string = `${ socket.token.userId }`
      this.app.models.users.findById(userId, (err: Error, user: Users) => {
        console.log('A user has been disconnected:', user.id);
        user.updateAttributes({ connected: false  });
      });
    }
  }
}
module.exports = OnDisconnect;
*/
