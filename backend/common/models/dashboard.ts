import {Model} from "@mean-expert/model";
import {RabbitPub} from '../../server/RabbitPub';

/**
 * @module Dashboard
 * @description
 * Write a useful Dashboard Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: {name: "before save", type: "operation"},
    afterSave: {name: "after save", type: "operation"},
    afterDelete: {name: "after delete", type: "operation"}
  },
  remotes: {},
})

class Dashboard {

  // LoopBack model instance is injected in constructor
  constructor(public model: any) {

  }

  // Example Operation Hook
  public beforeSave(ctx: any, next: Function): void {
    console.log("Dashboard: Before Save");
    if (ctx.instance) ctx.instance.createdAt = new Date();
    next();
  }

  public afterDelete(ctx: any, next: Function): void {
    // Get the dashboardId and delete widgets belonging to the dashboard
    const dashboardId = ctx.where.id;
    if (dashboardId) {
      this.model.app.models.Widget.destroyAll({dashboardId: dashboardId}, (err: any, result: any) => {
        if (err) console.error(err);
      });
    }
    let dashboard = ctx.instance;
    if (dashboard) {
      const payload = {
        event: "dashboard",
        content: dashboard,
        action: "DELETE"
      };
      RabbitPub.getInstance().pub(payload);
      next();
    }
  }

  public afterSave(ctx: any, next: Function): void {
    // Pub-sub
    let dashboard = ctx.instance;
    const payload = {
      event: "dashboard",
      content: dashboard,
      action: ctx.isNewInstance ? "CREATE" : "UPDATE"
    };
    dashboard.organizationId ?
      RabbitPub.getInstance().pub(payload, dashboard.organizationId) :
      RabbitPub.getInstance().pub(payload);
    next();
  }
}

module.exports = Dashboard;
