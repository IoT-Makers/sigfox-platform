import {Model} from '@mean-expert/model';

/**
 * @module Dashboard
 * @description
 * Write a useful Dashboard Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' },
    beforeDelete: {name: 'before delete', type: 'operation'}
  },
  remotes: {
  }
})

class Dashboard {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Dashboard: Before Save');
    if (ctx.instance) {
      ctx.instance.createdAt = new Date();
    }
    next();
  }

  // Delete dashboard method
  beforeDelete(ctx: any, next: Function): void {
    // Get the dashboardId from instance
    const dashboardId = ctx.where.id;

    if (dashboardId) {
      this.model.app.models.Widget.destroyAll({dashboardId: dashboardId}, (err: any, result: any) => {  if (err) console.error(err); });
    }
    next();
  }
}

module.exports = Dashboard;
