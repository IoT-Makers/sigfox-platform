'use strict';

module.exports = (app: any) => {

  const AppSetting = app.models.AppSetting;

  const settings = [
    {key: 'canUserRegister', value: true, type: 'boolean'},
    {key: 'canUserCreateOrganization', value: true, type: 'boolean'},
    {key: 'showDeviceSuccessRate', value: false, type: 'boolean'}
  ];

  settings.forEach((setting) => {
    AppSetting.findOrCreate(setting, (err: any, createdObject: any, created: any) => {
      if (err) {
        console.error(err);
      }
      // (created) ? console.log('created: ', createdObject)
      //   : console.log('found: ', createdObject);
    });
  });

};
