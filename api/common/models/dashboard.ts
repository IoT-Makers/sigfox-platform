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
    afterDelete: {name: 'after delete', type: 'operation'}
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
    next();
  }

  // Delete dashboard method
  afterDelete(ctx: any, next: Function): void {
    // Get the dashboardId from instance
    const dashboardId = ctx.instance.dashboardId;

    this.model.app.models.Widget.destroyAll({dashboardId: dashboardId}, (error: any, result: any) => { });

    next(null, 'Success');
  }
}

module.exports = Dashboard;
