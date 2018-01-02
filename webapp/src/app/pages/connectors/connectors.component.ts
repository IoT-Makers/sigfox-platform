import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {AccessToken, Connector, FireLoopRef, User} from '../../shared/sdk/models';
import {ConnectorApi, UserApi} from '../../shared/sdk/services/custom';
import {Subscription} from 'rxjs/Subscription';
import {RealTime} from '../../shared/sdk/services/core';

@Component({
  selector: 'app-profile',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.scss']
})
export class ConnectorsComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('confirmModal') confirmModal: any;

  private newConnector: Connector = new Connector();
  public connectorNames = [{id: 'sigfox-api', text: 'Sigfox API'}, {id: 'free-mobile', text: 'Free Mobile'}, {id: 'office-365', text: 'Outlook (Office 365)'}];

  private connectorSub: Subscription;
  private connectorRef: FireLoopRef<Connector>;
  private connectors: Connector[] = new Array<Connector>();

  private devAccessTokenToRemove: AccessToken = new AccessToken();
  private callbackURL;

  // Notifications
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  constructor(@Inject(DOCUMENT) private document: any,
              private userApi: UserApi,
              private rt: RealTime,
              private connectorApi: ConnectorApi,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.warn('Connector: ngOnInit');

    // Get the logged in User object (avatar, email, ...)
    this.getUser();
    this.callbackURL = this.document.location.origin + '/api/Messages/sigfox';

    // Remove the new connector id (created server side) and set the createdAt date
    this.newConnector.id = null;
    this.newConnector.createdAt = new Date();

    this.setup();
    
    /*if (
      this.rt.connection.isConnected() &&
      this.rt.connection.authenticated
    ) {
      this.rt.onReady().subscribe(() => this.setup());
    } else {
      this.rt.onAuthenticated().subscribe(() => this.setup());
      this.rt.onReady().subscribe();
    }*/
  }

  getUser(): void {
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();
    this.userApi.findById(this.user.id, {}).subscribe((user: User) => {
      this.user = user;
    });
  }

  setup(): void {
    // this.ngOnDestroy();

    // Get and listen categories
    this.connectorRef = this.rt.FireLoop.ref<Connector>(Connector);
    this.connectorSub = this.connectorRef.on('change',
      {
        where: {
          userId: this.user.id
        }
      }
    ).subscribe((connectors: Connector[]) => {
      this.connectors = connectors;
      this.connectors.forEach(connector => {
      });
    });
  }

  nameSelected(name: any) {
    this.newConnector.name = name.id;
  }

  createDevAccessToken(): void {
    const newAccessToken = {
      ttl: -1
    };
    this.userApi.createAccessTokens(this.user.id, newAccessToken).subscribe((accessToken: AccessToken) => {
      this.user.devAccessTokens.push(accessToken);
      this.userApi.patchAttributes(this.user.id, {devAccessTokens: this.user.devAccessTokens}).subscribe((user: User) => {
        this.user = user;
      });
    });
  }

  showRemoveModal(devAccessToken: AccessToken): void {
    this.confirmModal.show();
    this.devAccessTokenToRemove = devAccessToken;
  }

  removeDevAccessToken(): void {
    this.userApi.destroyByIdAccessTokens(this.user.id, this.devAccessTokenToRemove.id).subscribe(value => {
        const index = this.user.devAccessTokens.indexOf(this.devAccessTokenToRemove);
        this.user.devAccessTokens.splice(index, 1);
        this.userApi.patchAttributes(this.user.id, {devAccessTokens: this.user.devAccessTokens}).subscribe((user: User) => {
          this.user = user;
        });
      }
    );
    this.confirmModal.hide();
  }

  saveConnector(connector: Connector): void {
    connector.userId = this.user.id;

    this.connectorRef.upsert(connector).subscribe(value => {
      this.toasterService.pop('success', 'Success', 'The connector was successfully updated.');
    }, err => {
      this.toasterService.pop('warning', 'Oupsi', 'Have you filled all the required fields?');
    });
  }

  removeConnector(connector: Connector) {
    this.connectorRef.remove(connector).subscribe(value => {
      this.toasterService.pop('success', 'Success', 'The connector was successfully cleared.');
    });
  }

  ngOnDestroy(): void {
    console.warn('Connector: ngOnDestroy');
    if (this.connectorRef) this.connectorRef.dispose();
    if (this.connectorSub) this.connectorSub.unsubscribe();
  }
}
