import { by, element } from 'protractor';

export class Nav {

  toAlerts() {
    return element(by.xpath("//a[@href='#/alerts']")).click();
  }

  toApi() {
    return element(by.xpath("//a[@href='#/api']")).click();
  }

  toBeacons() {
    return element(by.xpath("//a[@href='#/beacons']")).click();
  }

  toCategories() {
    return element(by.xpath("//a[@href='#/categories']")).click();
  }

  toConnectors() {
    return element(by.xpath("//a[@href='#/connectors']")).click();
  }

  toDevices() {
    return element(by.xpath("//a[@href='#/devices']")).click();
  }

  toMessages() {
    return element(by.xpath("//a[@href='#/messages']")).click();
  }

  toOverview() {
    return element(by.xpath("//a[@href='#/']")).click();
  }

  toParsers() {
    return element(by.xpath("//a[@href='#/parsers']")).click();
  }

}
