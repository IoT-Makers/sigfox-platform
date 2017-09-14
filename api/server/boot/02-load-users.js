'use strict';

module.exports = function(app){

  if (app.dataSources.db.name !== 'Memory' && process.env.INITDB != false) {
    return
  }

  var Role = app.models.Role;
  var User = app.models.user;
  var RoleMapping = app.models.RoleMapping;

    User.create([
      {username: 'Antoine', email: 'antoine@admin.com', password: 'password', emailVerified: 'true', avatar: 'http://www.tresnjica.com/img/daycare.png', createdAt: "2017-08-29T07:59:45.675Z"},
      {username: 'Louis', email: 'louis@admin.com', password: 'password', emailVerified: 'true', avatar: 'http://www.tresnjica.com/img/daycare.png', createdAt: "2017-08-29T07:59:45.675Z"},
      {username: 'Bob', email: 'bob@user.com', password: 'password', emailVerified: 'true', avatar: 'http://www.tresnjica.com/img/daycare.png', createdAt: "2017-08-29T07:59:45.675Z"}
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
};
