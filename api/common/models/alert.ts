import { Model } from '@mean-expert/model';
/**
 * @module Alert
 * @description
 * Write a useful Alert Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
  },
  remotes: {
  }
})

class Alert {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

}

module.exports = Alert;
