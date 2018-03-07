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

module.exports = function (app) {
  var Role = app.models.Role;
  var User = app.models.user;
  var RoleMapping = app.models.RoleMapping;

  RoleMapping.settings.strictObjectIDCoercion = true;

  // RoleMapping.belongsTo(User);
  // User.hasMany(RoleMapping, {foreignKey: 'principalId'});
  // Role.hasMany(User, {through: RoleMapping, foreignKey: 'roleId'});


  Role.registerResolver('organizationMember', function (role, context, cb) {

    //cb(null, true);

    // console.log("Role: ", role);
    //console.log("context: ", context);

    function reject() {
      console.log("Reject");
      process.nextTick(function () {
        cb("Error", false);
      });

    }

    function authorize() {
      console.log("Authorize");
      process.nextTick(function () {
        cb(null, true);
      });

    }

    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }

    //if the target model is not project
    if (context.modelName !== 'Organization') {
      return reject();
    }


    context.model.findById(context.modelId, {include: 'Members'}, function (err, object) {

      if (err || !object) {
        return reject();
      }else{

      if (!object.Members) {
        return reject();
      }else {

        //Check if user is a member of the organization
        //console.log(object);
        var members = object.toJSON().Members;
        members.forEach(function (member, index, array) {

          if (member.id.toString() === userId.toString()) {
            return authorize();
          } else {
            if (index === array.length - 1) {
              return reject();
            }
          }
        });

      }}

    });


  });


};
