// import { BootScript } from '@mean-expert/boot-script';
//
// @BootScript()
// class Role {
//   constructor(app: any) {
//
//
//   }
// }
//
// module.exports = Role;

module.exports = (app: any) => {
  const Role = app.models.Role;
  const User = app.models.user;
  const RoleMapping = app.models.RoleMapping;

  const errorMessage = '';

  RoleMapping.settings.strictObjectIDCoercion = true;

  // RoleMapping.belongsTo(User);
  // User.hasMany(RoleMapping, {foreignKey: 'principalId'});
  // Role.hasMany(User, {through: RoleMapping, foreignKey: 'roleId'});


  Role.registerResolver('organizationMember', (role: any, context: any, cb: Function) => {

    //cb(null, true);

    // console.log('Role: ', role);
    //console.log('context: ', context);

    function reject() {
      //console.log('Reject');
      process.nextTick(() => {
        cb('RoleResolver Error', false);
      });

    }

    function authorize() {
      //console.log('Authorize');
      process.nextTick(() => {
        cb(null, true);
      });

    }

    // Do not allow anonymous users
    const userId = context.accessToken.userId;
    if (!userId) return reject();

    // If the target model is Organization
    else if (context.modelName === 'Organization') {

      if (!context.modelId) {
        //Is admin?
        User.findById(userId, {include: 'roles'}, (err: any, object: any) => {
          const roles = object.toJSON().roles;
          let authorized = false;
          roles.forEach((role: any, index: any, array: any) => {
            if (role.name === 'admin') {
              authorized = true;
              return authorized;
            } else if (index === array.length - 1 && authorized === false) {
              if (!cb) return reject();
            }
          });
        });

      } else {

        context.model.findById(context.modelId, {include: 'Members'}, (err: any, organization: any) => {
          if (err || !organization) return reject();
          else if (!organization.Members) return reject();
          else {
            // Check if user is a member of the organization
            const members = organization.toJSON().Members;
            let authorized = false;
            members.forEach((member: any, index: any, array: any) => {

              if (member.id.toString() === userId.toString()) {
                //console.log('callback 3: Authorize');
                authorized = true;
                return authorize();
              } else if (index === array.length - 1 && authorized === false) {
                //console.log('callback 4: Member not in organization');
                if (!cb) return reject();
              }
            });
          }
        });
      }
    }
    else return reject();
  });
};
