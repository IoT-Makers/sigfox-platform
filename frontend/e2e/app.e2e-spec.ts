import { browser } from 'protractor';

import { Header } from './po/header.po';
import { LoginPage } from './po/login.po';
import { Nav } from './po/nav.po';
import { OverviewPage } from './po/overview.po';
import { ProfilePage } from './po/profile.po';
import { RegisterPage } from './po/register.po';


const email: string = 'testuser@test.local';
const password: string = 'testpass';


browser.waitForAngularEnabled(false);

describe('Register', () => {
  const page: RegisterPage = new RegisterPage();
  const header: Header = new Header();

  it('be able to open register page', async() => {
    page.open();
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/register");
    });
  });

  it('redirect to overview page after register user', async() => {
    page.createAccount(email, password);
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/");
    });
  });

  it('be able to logout', async() => {
    header.logout();
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/");
    });
  });

});

describe('Login', () => {
  const page: LoginPage = new LoginPage();

  it('be able to open login page', async() => {
    page.open();
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/login");
    });
  });

  it('redirect to overview page after succeeded to login', async() => {
    page.login(email, password);
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/");
    });
  });

});

describe('Overview', () => {
  const page: OverviewPage = new OverviewPage();
  const nav: Nav = new Nav();

  it('be able to open overview', async() => {
    page.open();
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/");
    });
  });

  it('be able to open categories by nav', async() => {
    nav.toCategories();
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/categories");
    });
  });

  it('be able to open devices by nav', async() => {
    nav.toDevices();
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/devices");
    });
  });

  it('be able to open messages by nav', async() => {
    nav.toMessages();
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/messages");
    });
  });

  it('be able to open alerts by nav', async() => {
    nav.toAlerts();
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/alerts");
    });
  });

  it('be able to open parsers by nav', async() => {
    nav.toParsers();
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/parsers");
    });
  });
  
  it('be able to open connectors by nav', async() => {
    nav.toConnectors();
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/connectors");
    });
  });

  it('be able to open beacons by nav', async() => {
    nav.toBeacons();
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/beacons");
    });
  });

  it('be able to open api by nav', async() => {
    nav.toApi();
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/api");
    });
  });

});

describe('Profile', () => {
  const page: ProfilePage = new ProfilePage();
  const header: Header = new Header();

  it('be able to open profile page', async() => {
    page.open();
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/profile");
    });
  });

  it('redirect to login page after delete account', async() => {
    page.deleteAccount();
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/login");
    });
  });

});
