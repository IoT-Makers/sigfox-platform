import { Model } from '@mean-expert/model';
/**
 * @module Beacon
 * @description
 * Write a useful beacon Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: { }
})

class Beacons {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Beacon: Before Save');
    if (ctx.instance) {
      ctx.instance.createdAt = new Date();
      ctx.instance.id = ctx.instance.id.toUpperCase();
    }
    next();
  }
}

module.exports = Beacons;
