import {Model} from "@mean-expert/model";
import {PrimusClientFn} from "../../server/PrimusClientFn";

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

  private primusClient: any;

  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
    this.primusClient = PrimusClientFn.newClient();
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
      this.primusClient.write(payload);
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
    this.primusClient.write(payload);
    next();
  }
}

module.exports = Beacons;
