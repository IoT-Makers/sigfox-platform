import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row => {
        // Data
        const hasData = row.data && row.data.indexOf(query) > -1;
        // Device ID
        const hasDeviceId = row.deviceId && row.deviceId.indexOf(query.toUpperCase().replace(/\s/g, '')) > -1;
/*
        // Variables
        let regExp = new RegExp('.[*].', 'ig');
        console.log(query.match(regExp));
        if (query.match(regExp) !== null) {
          const startQuery = query.substring(0, query.indexOf('*'));
          const endQuery = query.substring(query.indexOf('*') + 1, query.length);
          query = query.replace('*', '');

          regExp = new RegExp(startQuery + '[A-Za-z0-9]{1}' + endQuery, 'ig');
          //console.log(row.deviceId.match(regExp));
          hasDeviceId = row.deviceId.match(regExp);
        }
*/

        return hasDeviceId || hasData;
      });
    }
    return array;
  }
}
