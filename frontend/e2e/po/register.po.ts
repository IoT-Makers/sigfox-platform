import { browser, by, element } from 'protractor';

export class RegisterPage {

  open() {
    return browser.get('/#/register');
  }

  createAccount(email: string, password: string) {
    element(by.name('username')).sendKeys(email);
    element(by.name('password')).sendKeys(password);
    element(by.name('verifyPassword')).sendKeys(password);
    return element(by.xpath("//button[@type='submit']")).click();
  }

}
