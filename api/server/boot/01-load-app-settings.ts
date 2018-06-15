import {computeCtr, decryptPayload, encryptPayload} from '../../common/models/utils';

module.exports = (app: any) => {

  let ctr = computeCtr('02310c92', true, '3844');
  console.log(encryptPayload('5f03330e94ba63d138', 'bc78a84252adff85967a01ddd5e38370', ctr));

  ctr = computeCtr('02310c92', false, '3844');
  console.log(decryptPayload('ad8ee74338d77510', 'bc78a84252adff85967a01ddd5e38370', ctr));

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
};
