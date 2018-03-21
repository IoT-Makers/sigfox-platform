import { Model } from '@mean-expert/model';
/**
 * @module AlertHistory
 * @description
 * Write a useful AlertHistory Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: { },
  remotes: { }
})

class AlertHistory {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

}

module.exports = AlertHistory;
