/* tslint:disable */
import {
  Message
} from '../index';

declare var Object: any;
export interface MessagePropertyInterface {
  "key": string;
  "value": string;
  "id"?: number;
  "MessageId"?: string;
  "messageId"?: string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  Message?: Message;
}

export class MessageProperty implements MessagePropertyInterface {
  "key": string = '';
  "value": string = '';
  "id": number = 0;
  "MessageId": string = '';
  "messageId": string = '';
  "createdAt": Date = new Date(0);
  "updatedAt": Date = new Date(0);
  Message: Message = null;
  constructor(data?: MessagePropertyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MessageProperty`.
   */
  public static getModelName() {
    return "MessageProperty";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MessageProperty for dynamic purposes.
  **/
  public static factory(data: MessagePropertyInterface): MessageProperty{
    return new MessageProperty(data);
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
      name: 'MessageProperty',
      plural: 'MessageProperties',
      path: 'MessageProperties',
      properties: {
        "key": {
          name: 'key',
          type: 'string'
        },
        "value": {
          name: 'value',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "MessageId": {
          name: 'MessageId',
          type: 'string'
        },
        "messageId": {
          name: 'messageId',
          type: 'string'
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
        Message: {
          name: 'Message',
          type: 'Message',
          model: 'Message'
        },
      }
    }
  }
}
