'use strict';

module.exports = function(app){

  var Role = app.models.Role;
  var User = app.models.user;
  var RoleMapping = app.models.RoleMapping;

  // User.create([
  //   {username: 'Antoine', email: 'antoine@admin.com', password: 'password', emailVerified: 'true', avatar: 'https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png', createdAt: new Date()},
  //   {username: 'Louis', email: 'louis@admin.com', password: 'password', emailVerified: 'true', avatar: 'https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png', createdAt: new Date()},
  //   {username: 'Bob', email: 'bob@user.com', password: 'password', emailVerified: 'true', avatar: 'https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png', createdAt: new Date()}
  // ], function (err, users) {
  //   if (err) throw err;
  //
  //   console.log('Created users:', users);
  //
  //   // Create the admin role
  //   Role.create({
  //     name: 'admin'
  //   }, function(err, role) {
  //     if (err) throw err;
  //
  //     console.log('Created role:', role);
  //
  //     // Make Antoine an admin
  //     role.principals.create({
  //       principalType: RoleMapping.USER,
  //       principalId: users[0].id
  //     }, function(err, principal) {
  //       if (err) throw err;
  //       console.log('Created principal:', principal);
  //     });
  //
  //     // Make Louis an admin
  //     role.principals.create({
  //       principalType: RoleMapping.USER,
  //       principalId: users[1].id
  //     }, function(err, principal) {
  //       if (err) throw err;
  //       console.log('Created principal:', principal);
  //     });
  //   });
  // });

  // //Create the admin role
  //   Role.findOrCreate({
  //     name: 'admin'
  //   }, function(err, role) {
  //     if (err) throw err;
  //     // Make Louis an admin
  //     role.principals.create({
  //       principalType: RoleMapping.USER,
  //       principalId: "5a958a54e0f0de07e58690a2"
  //     }, function(err, principal) {
  //       if (err) throw err;
  //       console.log('Created principal:', principal);
  //     });
  //   });
};
