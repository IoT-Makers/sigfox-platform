import { by, element } from 'protractor';

export class Header {

  logout() {
    return element(by.xpath("//a[@href='#']")).click();
  }

}
