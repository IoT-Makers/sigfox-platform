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

module.exports = function(app) {
  var Role = app.models.Role;
  var User = app.models.user;
  var RoleMapping = app.models.RoleMapping;

  // Role.registerResolver('organizationMember', function(role, context, cb) {
  //   function reject() {
  //     process.nextTick(function() {
  //       cb(null, false);
  //     });
  //   }
  // });

};
