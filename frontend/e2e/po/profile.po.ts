import { browser, by, element } from 'protractor';

export class ProfilePage {

  open() {
    return browser.get('/#/profile');
  }

  deleteAccount() {
    element(by.css("div.row button.btn-danger")).click();
    browser.sleep(500);

    return element(by.cssContainingText('.modal-dialog button', 'Delete')).click();
  }

  getOrganizations() {
    return element.all(by.xpath("//strong[@class='text-organization']"));
  }

  deleteOrganization() {
    element(by.css('table i.fa-trash')).click();
  }

}
