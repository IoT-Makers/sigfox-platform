import {Model} from "@mean-expert/model";
import {PrimusClientFn} from "../../server/PrimusClientFn";

/**
 * @module Widget
 * @description
 * Write a useful Widget Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: {name: "before save", type: "operation"},
    afterSave: { name: "after save", type: "operation" },
    afterDelete: {name: "after delete", type: "operation"},
  },
  remotes: { },
})

class Widget {

  private primusClient: any;

  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
    this.primusClient = PrimusClientFn.newClient();
  }

  // Example Operation Hook
  public beforeSave(ctx: any, next: Function): void {
    if (ctx.instance) ctx.instance.createdAt = new Date();
    console.log("Widget: Before Save");
    next();
  }

  public afterDelete(ctx: any, next: Function): void {
    let widget = ctx.instance;
    if (widget) {
      const payload = {
        event: "widget",
        content: widget,
        action: "DELETE"
      };
      this.primusClient.write(payload);
    }
    next();
  }

  public afterSave(ctx: any, next: Function): void {
    // Pub-sub
    let widget = ctx.instance;
    const payload = {
      event: "widget",
      content: widget,
      action: ctx.isNewInstance ? "CREATE" : "UPDATE"
    };
    this.primusClient.write(payload);
    next();
  }
}

module.exports = Widget;
