import { browser, by, element } from 'protractor';

export class Header {

  logout() {
    return element(by.css("header i.fa-sign-out")).click();
  }

  createOrganization(name: string, logoUrl: string) {
    element(by.css("header i.text-organization")).click();
    element(by.css("header div.dropdown-menu i.fa-plus")).click();
    browser.sleep(500);
    let n = element(by.xpath("//input[@name='organizationToAddOrEdit.name']"));
    n.clear();
    n.sendKeys(name);

    let u = element(by.xpath("//input[@name='organizationToAddOrEdit.logo']"));
    u.clear();
    u.sendKeys(logoUrl);

    return element(by.css("div.modal-footer button.btn-organization")).click();
  }

}
