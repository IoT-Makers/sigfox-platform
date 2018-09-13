import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row => {
        const hasDeviceId = row.deviceId && row.deviceId.indexOf(query) > -1;
        const hasData = row.data && row.data.indexOf(query) > -1;
        return hasDeviceId || hasData;
      });
    }
    return array;
  }
}
