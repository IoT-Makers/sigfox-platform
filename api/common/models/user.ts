import {Model} from '@mean-expert/model';
const path = require('path');

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
    afterRemoteChangePassword: {name: 'changePassword', type: 'afterRemote'},
    beforeRemoteDelete: {name: 'deleteById', type: 'beforeRemote'},
    afterRemoteDelete: {name: 'deleteById', type: 'afterRemote'}
  },
  remotes: {
    /*deleteUser: {
      accepts: [
        {arg: 'userPassword', type: 'string', required: true, description: 'The user password'},
        {arg: 'req', type: 'object', http: {source: 'req'}}
      ],
      returns: {arg: 'result', type: 'array'},
      http: {path: '/delete-user', verb: 'delete'}
    }*/
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
              console.log('Successfully restored devAccessTokens in AccessToken model.');
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

  afterRemoteLogin(ctx: any, loggedUser: any, next: any) {
    next();
  }

  afterRemoteCreate(ctx: any, userInstance: any, next: any) {

    userInstance.email = userInstance.email.toLocaleLowerCase();

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
          } else {

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

    const options = {
      type: 'email',
      to: userInstance.email,
      from: 'noreply@thenorthweb.com',
      subject: 'Merci de votre inscription.',
      template: path.resolve(__dirname, '../../server/views/welcome.ejs'),
      redirect: '',
      user: user
    };

    // userInstance.verify(options, function (err:any, response:any, next:Function) {
    //   if (err) {
    //     console.log(err);
    //     ctx.res.status(err.status || 500);
    //   }
    //
    //   console.log('> verification email sent:', response);
    //
    //   context.res.status(response.status).json('response', {
    //     title: 'Signed up successfully',
    //     content: 'Please check your email and click on the verification link ' +
    //     'before logging in.',
    //     redirectTo: '/',
    //     redirectToLinkText: 'Log in'
    //   });
    //
    // });

  }

  // Before delete user method
  beforeRemoteDelete(ctx: any, result: any, next: Function): void {
    // Models
    const User = this.model.app.models.User;

    const userId = ctx.args.id;

    User.findOne({where: {id: userId}, include: 'Organizations'}, (err: any, user: any) => {
      if (user.Organizations) {
        user.toJSON().Organizations.forEach((orga: any) => {
          user.Organizations.remove(orga.id, (err: any, result: any) => {
            if (!err) {
              console.log('Unlinked user from organization (' + orga.name + ')');
            }
          });
        });
      }
    });
    next();
  }

  // After delete user method
  afterRemoteDelete(ctx: any, result: any, next: Function): void {
    // Models
    const RoleMapping = this.model.app.models.RoleMapping;
    const Category = this.model.app.models.Category;
    const Device = this.model.app.models.Device;
    const Message = this.model.app.models.Message;
    const Alert = this.model.app.models.Alert;
    const AlertHistory = this.model.app.models.AlertHistory;
    const Geoloc = this.model.app.models.Geoloc;
    const Connector = this.model.app.models.Connector;
    const AccessToken = this.model.app.models.AccessToken;

    // Obtain the userId with the access token of ctx

    // console.log(ctx.args.id);
    // console.log(result);

    const userId = ctx.args.id;
/*
    RoleMapping.destroyAll({principalId: userId}, (error: any, result: any) => { });
    Category.destroyAll({userId: userId}, (error: any, result: any) => { });
    Device.destroyAll({userId: userId}, (error: any, result: any) => { });
    Message.destroyAll({userId: userId}, (error: any, result: any) => { });
    Alert.destroyAll({userId: userId}, (error: any, result: any) => { });
    AlertHistory.destroyAll({userId: userId}, (error: any, result: any) => { });
    Geoloc.destroyAll({userId: userId}, (error: any, result: any) => { });
    Connector.destroyAll({userId: userId}, (error: any, result: any) => { });
    AccessToken.destroyAll({userId: userId}, (error: any, result: any) => { });*/
    // this.model.app.models.Dashboard.destroyAll({userId: userId}, (error: any, result: any) => { });
    // this.model.app.models.Widget.destroyAll({userId: userId}, (error: any, result: any) => { });

    next(null, 'Success');
  }
}

module.exports = user;
