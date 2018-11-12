import * as amqp from 'amqplib/callback_api'

export class RabbitPub {

  private ch: amqp.Channel;
  private ex = 'realtime_exchange';

  private static _instance: RabbitPub = new RabbitPub();

  constructor() {
    if(RabbitPub._instance){
      throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
    }
    this.connect();
    RabbitPub._instance = this;
  }

  public static getInstance(): RabbitPub {
    return RabbitPub._instance;
  }

  public connect(): void {
    let rabbitURL = process.env.RABBIT_URL || 'amqp://localhost';
    amqp.connect(rabbitURL, (err, conn) => {
      conn.createChannel((err, ch) => {
        if (err) console.error(err);
        ch.assertExchange(this.ex, 'fanout', {durable: true}, (err, ok) => {
          if (err) console.error(err);
          this.ch = ch;
        });
      });
    });
  }

  public pub(msg: object) {
    this.publish(JSON.stringify(msg));
  }

  public publish(msg: string) {
    if (!this.ch) return;
    this.ch.publish(this.ex, 'rt', Buffer.from(msg, 'utf8'));
    console.log(" [x] Sent %s", msg);
  }
}


// setTimeout(function() { conn.close(); process.exit(0) }, 500);
