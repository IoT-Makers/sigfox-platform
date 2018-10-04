import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row => {
        const hasLastName = row.lastName && row.lastName.toUpperCase().indexOf(query.toUpperCase()) > -1;
        const hasFirstName = row.firstName && row.firstName.toUpperCase().indexOf(query.toUpperCase()) > -1;
        return hasFirstName || hasLastName;
      });
    }
    return array;
  }
}
