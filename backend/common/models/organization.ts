import {Model} from "@mean-expert/model";

/**
 * @module Organization
 * @description
 * Write a useful organization Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: "before save", type: "operation" },
    beforeDelete: { name: "before delete", type: "operation" }
    },
  remotes: {},
})

class Organization {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  public beforeSave(ctx: any, next: Function): void {
    console.log("organization: Before Save");
    if (ctx.instance) ctx.instance.createdAt = new Date();
    next();
  }

  // Before delete, remove all organizaton models links
  public beforeDelete(ctx: any, next: Function): void {
    // Models
    const User = this.model.app.models.User;
    const Organization = this.model;
    const Category = this.model.app.models.Category;
    const Device = this.model.app.models.Device;
    const Message = this.model.app.models.Message;

    const organizationId = ctx.where.id;

    Organization.findOne({
      where: {id: organizationId},
      include: ["Members", "Categories", "Devices", "Messages", "Dashboards"],
    }, (err: any, organization: any) => {
      // console.log(category);
      if (!err && organization) {
        organization.toJSON().Members.forEach((member: any) => {
          organization.Members.remove(member.id, (err: any) => {
            console.log("Unlinked members from organization");
          });
        });
        organization.toJSON().Categories.forEach((category: any) => {
          organization.Categories.remove(category.id, (err: any) => {
            console.log("Unlinked categories from organization");
          });
        });
        organization.toJSON().Devices.forEach((device: any) => {
          organization.Devices.remove(device.id, (err: any) => {
            console.log("Unlinked devices from organization");
          });
        });
        organization.toJSON().Messages.forEach((message: any) => {
          organization.Messages.remove(message.id, (err: any) => {
            console.log("Unlinked messages from organization");
          });
        });
      } else {
        console.error(err);
      }
    });
    next();
  }
}

module.exports = Organization;
