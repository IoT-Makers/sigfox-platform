import { browser } from 'protractor';

import { Header } from './po/header.po';
import { LoginPage } from './po/login.po';
import { Nav } from './po/nav.po';
import { OverviewPage } from './po/overview.po';
import { ProfilePage } from './po/profile.po';
import { RegisterPage } from './po/register.po';


const email: string = 'testuser@test.local';
const password: string = 'testpass';
const organization: string = 'test organization';


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
      expect(url).toEqual("http://localhost:4201/#/login");
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

describe('Organizations', () => {
  const header: Header = new Header();

  it('be able to create organization', async() => {
    // FIXME: wait for hide toast.
    browser.sleep(5000);

    header.createOrganization(organization, "https://www.shareicon.net/data/128x128/2017/06/21/887415_group_512x512.png");

    browser.sleep(500);
    browser.getCurrentUrl().then(url => {
      expect(url).toContain("http://localhost:4201/#/organization/");
    });
  })

});

describe('Profile', () => {
  const page: ProfilePage = new ProfilePage();

  it('be able to open profile page', async() => {
    page.open();
    browser.sleep(500);

    browser.getCurrentUrl().then(url => {
      expect(url).toEqual("http://localhost:4201/#/profile");
    });
  });

  it('show organizations', () => {
    page.getOrganizations().then(items => {
      expect(items.length).toEqual(1);
      expect(items[0].getText()).toEqual(organization);
    });
  });

  it('be able to delete organization', () => {
    page.deleteOrganization();
    browser.sleep(1000);
    page.getOrganizations().then(items => {
      expect(items.length).toEqual(0);
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
