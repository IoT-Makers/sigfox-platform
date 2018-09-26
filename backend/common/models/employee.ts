import {Model} from "@mean-expert/model";

/**
 * @module Employee
 * @description
 * Write a useful Employee Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: {name: "before save", type: "operation"},
    beforeDelete: {name: "before delete", type: "operation"},
  },
  remotes: {
    linkToDevice: {
      accepts: [
        {arg: "employeeId", type: "string", required: true, description: "The employee ID"},
        {arg: "deviceId", type: "string", required: true, description: "The device ID"}
      ],
      http: {
        path: "/link-to-device",
        verb: "get",
      },
      returns: {type: [], root: true},
    },
  },
})

class Employee {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
  }

  // Example Operation Hook
  public beforeSave(ctx: any, next: Function): void {
    console.log("Employee: Before Save");
    if (ctx.instance) ctx.instance.createdAt = new Date();
    next();
  }

  // Delete employee method
  public beforeDelete(ctx: any, next: Function): void {
    next();
  }

  public linkToDevice(employeeId: string, deviceId: string, next: Function): void {
    // Models
    const Device = this.model.app.models.Device;

    Device.findById(deviceId, {}, (err: any, deviceInstance: any) => {
      if (err) return next(err);
      else if (!deviceInstance) return next(null, 'No device found for this ID.');
      else {
        deviceInstance.patchAttributes({employeeId: employeeId}, (err: any, deviceInstance: any) => {
          if (err) return next(err);
          else return next(null, deviceInstance);
        });
      }
    });
  }
}

module.exports = Employee;
