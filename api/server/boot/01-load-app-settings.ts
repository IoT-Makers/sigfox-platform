import {decryptPayload, encryptPayload} from '../../common/models/utils';

module.exports = (app: any) => {

  let deviceId = parseInt('02310c92', 16).toString(2);
  while (deviceId.length < 32) {
    deviceId = '0' + deviceId;
  }
  /*deviceId = parseInt(deviceId, 2).toString(16);
  console.log(deviceId);*/

  const uplinkOrDownlink = '0';

  let seqNumber = parseInt('3844', 10).toString(2);
  while (seqNumber.length < 12) {
    seqNumber = '0' + seqNumber;
  }
  /*seqNumber = parseInt(seqNumber, 2).toString(16);
  console.log(seqNumber);*/

  let padding = '';
  while (padding.length < 83) {
    padding = '0' + padding;
  }

  let ctr = deviceId + uplinkOrDownlink + seqNumber + padding;
  ctr = parseInt(ctr, 2).toString(16);
  while (ctr.length < 32) {
    ctr = '0' + ctr;
  }
  const pek = 'bc78a84252adff85967a01ddd5e38370';
  const payload = '5f03330e94ba63d138';
  console.log(encryptPayload(payload, pek, ctr));

  const encryptedPayload = 'ad8ee74338d77510';
  console.log(decryptPayload(encryptedPayload, pek, ctr));

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
