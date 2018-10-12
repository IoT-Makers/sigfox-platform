/* tslint:disable */
import {
  Device
} from '../index';

declare var Object: any;
export interface EmployeeInterface {
  "firstName"?: string;
  "lastName"?: string;
  "jobTitle"?: string;
  "company"?: string;
  "country"?: string;
  "email"?: string;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  Device?: Device;
}

export class Employee implements EmployeeInterface {
  "firstName": string = '';
  "lastName": string = '';
  "jobTitle": string = '';
  "company": string = '';
  "country": string = '';
  "email": string = '';
  "id": any = <any>null;
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  Device: Device = null;
  constructor(data?: EmployeeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Employee`.
   */
  public static getModelName() {
    return "Employee";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Employee for dynamic purposes.
  **/
  public static factory(data: EmployeeInterface): Employee{
    return new Employee(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Employee',
      plural: 'Employees',
      path: 'Employees',
      idName: 'id',
      properties: {
        "firstName": {
          name: 'firstName',
          type: 'string'
        },
        "lastName": {
          name: 'lastName',
          type: 'string'
        },
        "jobTitle": {
          name: 'jobTitle',
          type: 'string'
        },
        "company": {
          name: 'company',
          type: 'string'
        },
        "country": {
          name: 'country',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        Device: {
          name: 'Device',
          type: 'Device',
          model: 'Device',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'employeeId'
        },
      }
    }
  }
}
