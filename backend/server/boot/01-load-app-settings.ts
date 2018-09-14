module.exports = (app: any) => {
  var db = app.dataSources.mongodb;
  db.automigrate(function(err: any) {
    if (err) throw err;
    console.log('Automigrate complete');
    const AppSetting = app.models.AppSetting;
    let countAppSettings = 0;

    AppSetting.count((err: any, result: any) => {
      countAppSettings = result;
      if (countAppSettings === 0) {
        const appSettings = [
          {key: 'canUserRegister', value: true, type: 'boolean'},
          {key: 'canUserCreateOrganization', value: true, type: 'boolean'},
          {key: 'showDeviceSuccessRate', value: false, type: 'boolean'}
        ];
        appSettings.forEach((appSetting) => {
          AppSetting.create(appSetting, (err: any, appSetting: any) => {
            if (err) {
              console.error(err);
            }
            // (created) ? console.log('created: ', createdObject)
            //   : console.log('found: ', createdObject);
          });
        });
      }
    });
  });
};
