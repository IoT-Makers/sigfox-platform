import { browser, by, element } from 'protractor';

export class ProfilePage {

  open() {
    return browser.get('/#/profile');
  }

  deleteAccount() {
    element(by.cssContainingText('button', 'Delete account')).click();
    browser.sleep(500);

    return element(by.cssContainingText('.modal-dialog button', 'Delete')).click();
  }

}
