import { Model } from '@mean-expert/model';
/**
 * @module EmailOutlook
 * @description
 * Write a useful EmailOutlook Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: { }
})

class EmailOutlook {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('EmailOutlook: Before Save');
    next();
  }
}

module.exports = (EmailOutlook: any) => {
  EmailOutlook.send = function() {
    throw new Error('You must connect the {{EmailOutlook}} Model to a {{Mail}} connector');
  };
  EmailOutlook.prototype.send = function() {
    throw new Error('You must connect the {{EmailOutlook}} Model to a {{Mail}} connector');
  };
};
