import * as amqp from 'amqplib/callback_api'

export interface PubMessageContent {
  userId: string;
  [propName: string]: any;
}

export interface PubMessage {
  event: string;
  content: PubMessageContent;
  action: string;
}

export class RabbitPub {

  private _ch: amqp.Channel;
  private EX = 'realtime_exchange_v2';

  private static _instance: RabbitPub = new RabbitPub();

  constructor() {
    if (RabbitPub._instance) {
      throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
    }
    this.connect();
    RabbitPub._instance = this;
  }

  public static getInstance(): RabbitPub {
    return RabbitPub._instance;
  }

  public connect(): void {
    let rabbitURL = process.env.RABBIT_URL || 'amqp://usr:pwd@localhost';
    amqp.connect(rabbitURL, (err, conn) => {
      if (err) {
        console.error(err);
        console.error('=> Rabittmq could not start');
      } else if (conn) {
        conn.createChannel((err, ch) => {
          if (err) console.error(err);
          ch.assertQueue('task_queue', {durable: true, messageTtl: 5000});
          ch.bindQueue('task_queue', this.EX, 'noOrg');
          ch.assertExchange(this.EX, 'topic', {durable: true}, (err, ok) => {
            if (err) console.error(err);
            this._ch = ch;
          });
        });
      }
    });
  }

  public pub(msg: PubMessage, extraRoutingKey?: string) {
    if (!this._ch) return;
    let rk = msg.content.userId.toString();
    let rk = msg.content.userId || msg.content.organizationId;
    rk = rk.toString();
    if (extraRoutingKey)
      extraRoutingKey === 'noOrg' ?
        rk = 'noOrg' :
        rk = `${rk}.${extraRoutingKey}`;
    console.log(rk);

    this._ch.publish(this.EX, rk, Buffer.from(JSON.stringify(msg), 'utf8'));
  }
}


