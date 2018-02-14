import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FireLoopRef, Parser, User} from '../../shared/sdk/models';
import {RealTime} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {UserApi} from '../../shared/sdk/services/custom';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  templateUrl: './parsers.component.html',
  styleUrls: ['./parsers.component.scss']
})
export class ParsersComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('confirmModal') confirmModal: any;

  private newParser: Parser = new Parser();
  private decodedPayload = [];
  private testPayload = [];

  private payload: any;

  private parsers: Parser[] = [];
  private parserRef: FireLoopRef<Parser>;
  private parserSub: Subscription;

  private parserToRemove: Parser = new Parser();

  // Notifications
  private toast;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });

  constructor(private rt: RealTime,
              private userApi: UserApi,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.log('Parsers: ngOnInit');
// Real Time
    if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
      this.setup();
    else
      this.rt.onAuthenticated().subscribe(() => this.setup());
    /*if (
      this.rt.connection.isConnected() &&
      this.rt.connection.authenticated
    ) {
      this.rt.onReady().subscribe(() => this.setup());
    } else {
      this.rt.onAuthenticated().subscribe(() => this.setup());
      this.rt.onReady().subscribe();
    }*/

    this.newParser.function = 'var payload,\n' +
      '  temperature,\n' +
      '  parsedData = [],\n' +
      '  obj = {};\n' +
      '\n' +
      '// If byte #1 of the payload is temperature (hex to decimal)\n' +
      'temperature = parseInt(payload.slice(0, 2), 16);\n' +
      '\n' +
      '// Store objects in parsedData array\n' +
      'obj = {};\n' +
      'obj.key = \'temperature\';\n' +
      'obj.value = temperature;\n' +
      'obj.type = \'number\';\n' +
      'obj.unit = \'°C\';\n' +
      'parsedData.push(obj);\n' +
      '\n' +
      '//console.log(parsedData);\n' +
      'return parsedData;';


  }

  setup(): void {
    // this.ngOnDestroy();
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

    // Parsers
    this.parserRef = this.rt.FireLoop.ref<Parser>(Parser);
    this.parserSub = this.parserRef.on('change').subscribe(
      (parsers: Parser[]) => {
        this.parsers = parsers;
        console.log(this.parsers);
      });
  }

  ngOnDestroy(): void {
    console.log('Parsers: ngOnDestroy');
    if (this.parserRef) this.parserRef.dispose();
    if (this.parserSub) this.parserSub.unsubscribe();
  }

  decodePayload(i: number, parser: Parser, payload: string): void {
    this.testPayload[i] = true;
    if (payload) {
      const fn = Function('payload', parser.function);
      this.decodedPayload[i] = fn(payload);
    } else {
      this.decodedPayload[i] = [{'error': 'Please fill input'}];
      setTimeout(function () {
        this.testPayload[i] = false;
      }.bind(this), 2000);
    }
  }

  closeDecodedPayload(i: number) {
    this.testPayload[i] = false;
  }

  create(): void {
    this.newParser.id = null;
    this.parserRef.create(this.newParser).subscribe(value => {
      this.newParser = new Parser();
      this.toasterService.pop('success', 'Success', 'The parser was successfully created.');
    }, err => {
      this.toasterService.pop('error', 'Error', err.error.message);
    });
  }

  update(parser: Parser): void {
    this.parserRef.upsert(parser).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'The parser was successfully updated.');
    }, err => {
      this.toasterService.pop('error', 'Error', err.error.message);
    });
  }

  showRemoveModal(parser: Parser): void {
    this.confirmModal.show();
    this.parserToRemove = parser;
  }

  remove(): void {
    this.parserRef.remove(this.parserToRemove).subscribe(value => {
      this.toasterService.pop('success', 'Success', 'The parser was successfully deleted.');
    }, err => {
      this.toasterService.pop('error', 'Error', err.error.message);
    });
    this.confirmModal.hide();
  }
}

