import { browser, by, element } from 'protractor';

export class LoginPage {

  open() {
    return browser.get('/#/login');
  }

  login(email: string, password: string) {
    element(by.name('email')).sendKeys(email);
    element(by.name('password')).sendKeys(password);
    return element(by.xpath("//button[@type='submit']")).click();
  }

}
