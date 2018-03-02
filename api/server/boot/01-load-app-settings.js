'use strict';

module.exports = function(app){

  var AppSetting = app.models.AppSetting;

  var settings = [
    {key: "canUserRegister", value: "true"},
    {key: "canUserCreateOrganization", value: "true"}
  ];

  settings.forEach(function (setting) {
    AppSetting.findOrCreate(setting, function (err, createdObject, created) {
      if (err) {
        console.error(err);
      }
      (created) ? console.log('created: ', createdObject)
        : console.log('found: ', createdObject);
    });
  });


};
