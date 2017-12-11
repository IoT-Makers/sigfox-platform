import {Model} from '@mean-expert/model';
import {AccessToken} from '../../../webapp/src/app/shared/sdk/models/AccessToken';

/**
 * @module user
 * @description
 * Write a useful user Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/

@Model({
  hooks: {
    beforeSave: {name: 'before save', type: 'operation'},
    afterRemoteLogin: {name: 'login', type: 'afterRemote'},
    afterRemoteCreate: {name: 'create', type: 'afterRemote'},
    afterRemoteChangePassword: {name: 'changePassword', type: 'afterRemote'}
  },
  remotes: {
    myRemote: {
      returns: {arg: 'result', type: 'array'},
      http: {path: '/my-remote', verb: 'get'}
    }
  }
})

class user {

  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
  }

  afterRemoteChangePassword(ctx: any, reuslt: any, next: Function): void {
    const userId = ctx.args.id;
    this.model.findById(
      userId,
      {},
      (err: any, userInstance: any) => {
        if (err) {
          console.error(err);
          next(err, userInstance);
        } else {
          // Found user
          const devAccessTokens = userInstance.devAccessTokens;
          if (devAccessTokens) {
            this.model.app.models.AccessToken.create(devAccessTokens, (error: any, result: any) => {
              if (err)
                next(error, result);
              else
                next();
              console.log('Successfully restored devAccessTokens in AccessToken db table.');
            });
          } else {
            next();
          }
        }
      });
  }

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('user: Before Save');
    next();
  }

  afterRemoteLogin(ctx: any, loggedUser: AccessToken, next: any) {
    next();
    // TODO: Check below
    /*const userId = loggedUser.userId;
    const user = {
      lastLogin: new Date()
    };
    this.model.upsertWithWhere(
      {where: {id: userId}},
      user,
      (err: any, response: any) => {
        if (err) {
          console.error(err);
        } else {
          console.log(response);
        }
        next();
      });*/

    /*    this.model.app.models.user.findById(
          userId,
          {},
          (err: any, userInstance: User) => { //callback
            userInstance.lastLogin = new Date(Date.now());
            console.log(userInstance);
            this.model.patchAttributes(
              userId,
              userInstance,
              (err: any, response: any) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(response);
                }
                next();
              });
          });*/
  }

  afterRemoteCreate(ctx: any, userInstance: any, next: any) {

    // let organization = {
    //   name: userInstance.email,
    //   ownerId: userInstance.id,
    // };

    const adminRole = {
      name: 'admin'
    };

    const userRole = {
      name: 'user'
    };


    // Check if any user exists
    this.model.count(
      (err: any, countUser: any) => {
        if (err) {
          console.log(err);
        } else {
          console.log(countUser);
          if (countUser === 1) {

            // Create admin
            this.model.app.models.Role.findOrCreate(
              {where: {name: 'admin'}}, // Find
              adminRole, // Create
              (err: any, instance: any, created: boolean) => { // Callback
                if (err) {
                  console.error('error creating device', err);
                } else if (created) {
                  console.log('created role', instance);
                  instance.principals.create({
                    principalType: this.model.app.models.RoleMapping.USER,
                    principalId: userInstance.id
                  }, (err: any, principalInstance: any) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(principalInstance);
                      next();
                    }
                  });

                } else {
                  console.log('found role', instance);
                  instance.principals.create({
                    principalType: this.model.app.models.RoleMapping.USER,
                    principalId: userInstance.id
                  }, (err: any, principalInstance: any) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(principalInstance);
                      next();
                    }
                  });
                }
              });
          }else{

            // Create user
            this.model.app.models.Role.findOrCreate(
              {where: {name: 'user'}}, // Find
              userRole, // Create
              (err: any, instance: any, created: boolean) => { // Callback
                if (err) {
                  console.error('error creating device', err);
                } else if (created) {
                  console.log('created role', instance);
                  instance.principals.create({
                    principalType: this.model.app.models.RoleMapping.USER,
                    principalId: userInstance.id
                  }, (err: any, principalInstance: any) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(principalInstance);
                      next();
                    }
                  });

                } else {
                  console.log('found role', instance);
                  instance.principals.create({
                    principalType: this.model.app.models.RoleMapping.USER,
                    principalId: userInstance.id
                  }, (err: any, principalInstance: any) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(principalInstance);
                      next();
                    }
                  });
                }
              });
          }
        }
      });



    // userInstance.Organizations.create(
    //   organization,
    //   (err: any, organizationInstance: any) => {
    //   if(err){
    //     console.log(err)
    //   }else{
    //     console.log(organizationInstance);
    //     console.log(user);
    //   }
    //   next();
    // });

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
