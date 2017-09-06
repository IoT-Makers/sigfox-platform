'use strict';

const isCreated = true;

module.exports = function(app){

  var Role = app.models.Role;
  var User = app.models.user;
  var RoleMapping = app.models.RoleMapping;

  if(!isCreated){

    User.create([
      {username: 'Antoine', email: 'antoine@admin.com', password: 'password', emailVerified: 'true', createdAt: "2017-08-29T07:59:45.675Z"},
      {username: 'Louis', email: 'louis@admin.com', password: 'password', emailVerified: 'true', createdAt: "2017-08-29T07:59:45.675Z"},
      {username: 'Bob', email: 'bob@user.com', password: 'password', emailVerified: 'true', createdAt: "2017-08-29T07:59:45.675Z"}
    ], function (err, users) {
      if (err) throw err;

      console.log('Created users:', users);

      // Create the admin role
      Role.create({
        name: 'admin'
      }, function(err, role) {
        if (err) throw err;

        console.log('Created role:', role);

        // Make Antoine an admin
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: users[0].id
        }, function(err, principal) {
          if (err) throw err;
          console.log('Created principal:', principal);
        });

        // Make Louis an admin
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: users[1].id
        }, function(err, principal) {
          if (err) throw err;
          console.log('Created principal:', principal);
        });
      });
    });

  }
};
