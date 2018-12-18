import {Model} from "@mean-expert/model";
import {RabbitPub} from '../../server/RabbitPub';

/**
 * @module Beacon
 * @description
 * Write a useful beacon Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: "before save", type: "operation" },
    afterDelete: { name: "after delete", type: "operation" },
    afterSave: { name: "after save", type: "operation" },
  },
  remotes: { },
})

class Beacons {

  // LoopBack model instance is injected in constructor
  constructor(public model: any) {

  }

  // Example Operation Hook
  public beforeSave(ctx: any, next: Function): void {
    console.log("Beacon: Before Save");
    if (ctx.instance) {
      ctx.instance.createdAt = new Date();
      ctx.instance.id = ctx.instance.id.toUpperCase();
    }
    next();
  }

  public afterDelete(ctx: any, next: Function): void {
    let beacon = ctx.instance;
    if (beacon) {
      // if the message is delete via a cascade, no instance is provided
      const payload = {
        event: "beacon",
        content: beacon,
        action: "DELETE"
      };
      RabbitPub.getInstance().pub(payload);
    }
    next();
  }


  public afterSave(ctx: any, next: Function): void {
    // Pub-sub
    let beacon = ctx.instance;
    const payload = {
      event: "beacon",
      content: beacon,
      action: ctx.isNewInstance ? "CREATE" : "UPDATE"
    };
    RabbitPub.getInstance().pub(payload);
    next();
  }
}

module.exports = Beacons;
