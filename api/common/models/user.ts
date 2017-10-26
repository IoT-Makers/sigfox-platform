import { Model } from '@mean-expert/model';
/**
 * @module user
 * @description
 * Write a useful user Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' },
    afterRemoteLogin: { name: 'login', type: 'afterRemote' },
    afterRemoteCreate: { name: 'create', type: 'afterRemote' }
  },
  remotes: {
    myRemote: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/my-remote', verb: 'get' }
    }
  }
})

class user {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('user: Before Save');
    next();
  }

  afterRemoteLogin(context: any, loggedUser: any, next: any) {

    let now = Date.now();

    let user = {
      id: loggedUser.userId,
      lastLogin: now
    };

    console.log(loggedUser);
    this.model.app.models.user.upsert(
      user,
      (err: any, response: any) => {
        if(err){
          console.log(err)
        }else{
          console.log(response);
        }
        next();
      });
  }

  afterRemoteCreate(context: any, user: any, next: any) {

    let organization = {
      name: user.email,
      ownerId:user.id,
    };

    user.Organizations.create(
      organization,
      (err: any, organizationInstance: any) => {
      if(err){
        console.log(err)
      }else{
        console.log(organizationInstance);
        // console.log(user);
        // organizationInstance.users.add(user,
        //   (err: any, organization: any) => {
        //     if(err){
        //       console.log(err)
        //     }else {
        //       console.log(organization);
        //     }
        // })

      }
      next();
    });

    // // this.model.app.models.Organization.create(
    // //   organization,
    //   (err: any, response: any) => {
    //     if(err){
    //       console.log(err)
    //     }else{
    //       console.log(response);
    //       this.model.app.models.Organization.link()
    //     }
    //     next();
    //   });
  }

  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next);
  }


}

module.exports = user;
