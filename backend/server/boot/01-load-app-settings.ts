/**
 * This bootscript loads the overall app settings
 * @param app
 */
module.exports = (app: any, cb: any) => {
  // This is an important env
  process.env.API_URL = 'https://api.' + process.env.BASE_URL.replace(/(^\w+:|^)\/\//, '');

  const AppSetting = app.models.AppSetting;
  let countAppSettings = 0;

  AppSetting.count((err: any, result: any) => {
    countAppSettings = result;
    if (countAppSettings == 0) {
      const appSettings = [
        {key: 'canUserRegister', value: true, type: 'boolean'},
        {key: 'canUserCreateOrganization', value: true, type: 'boolean'},
        {key: 'showDeviceSuccessRate', value: false, type: 'boolean'},
        {key: 'bannerMessage', value: 'Please keep in mind this platform is under active development.', type: 'string'},
        {key: 'isMongodbIndexed', value: false, type: 'boolean'}
      ];
      AppSetting.create(appSettings, (err: any, appSetting: any) => {
        if (err) console.error(err);
        cb();
      });
    } else {
      cb();
    }
  });
};
