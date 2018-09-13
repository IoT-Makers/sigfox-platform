import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FireLoopRef, Parser, User} from '../../shared/sdk/models';
import {RealTime} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {ParserApi, UserApi} from '../../shared/sdk/services/custom';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  templateUrl: './parsers.component.html',
  styleUrls: ['./parsers.component.scss']
})
export class ParsersComponent implements OnInit, OnDestroy {

  public user: User;

  @ViewChild('confirmModal') confirmModal: any;
  @ViewChild('confirmParseModal') confirmParseModal: any;

  public parserToAdd: Parser = new Parser();
  public parserToEdit: Parser = new Parser();
  public parserToRemove: Parser = new Parser();
  private decodedPayload = [];
  private testPayload = [];

  private payload: any;

  public parsers: Parser[] = [];

  private userRef: FireLoopRef<User>;
  private parserRef: FireLoopRef<Parser>;
  private parserSub: Subscription;


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
              toasterService: ToasterService,
              private parserApi: ParserApi) {
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

    this.parserToAdd.function = 'var payload,\n' +
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
    this.cleanSetup();
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();
    this.userRef = this.rt.FireLoop.ref<User>(User).make(this.user);



    // Parsers
    this.parserRef = this.userRef.child<Parser>('Parsers');
    this.parserSub = this.parserRef.on('change').subscribe(
      (parsers: Parser[]) => {
        this.parserApi.find({
          include: ['Devices']
        }).subscribe((parsers: Parser[]) => {
          this.parsers = parsers;
        });
      });
  }

  ngOnDestroy(): void {
    console.log('Parsers: ngOnDestroy');
    this.cleanSetup();
  }

  private cleanSetup() {
    if (this.parserRef) this.parserRef.dispose();
    if (this.userRef) this.userRef.dispose();
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
    this.parserRef.create(this.parserToAdd).subscribe(value => {
      this.parserToAdd = new Parser();
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'The parser was successfully created.');
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
  }

  update(parser: Parser): void {
    //this.parserRef.upsert(parser)
    this.parserApi.updateAttributes(parser.id, parser).subscribe((updatedParser: Parser) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'The parser was successfully updated.');

      if (parser.Devices.length > 0) {
        this.parserToEdit = parser;
        this.confirmParseModal.show();
      }

    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', 'Not allowed.');
    });
  }

  updateParsedData() {
    // Disconnect real-time to avoid app crashing
    this.rt.connection.disconnect();
    this.parserApi.parseAllDevices(this.parserToEdit.id, null, null).subscribe(result => {
      if (result.message === 'Success') {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('success', 'Success', 'All the messages were successfully parsed.');
        this.confirmParseModal.hide();
        this.rt.onReady();
      } else {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('warning', 'Warning', result.message);
        this.confirmParseModal.hide();
        this.rt.onReady();
      }
    });
  }

  showRemoveModal(parser: Parser): void {
    this.confirmModal.show();
    this.parserToRemove = parser;
  }

  remove(): void {
    this.parserRef.remove(this.parserToRemove).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'The parser was successfully deleted.');
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', 'Not allowed.');
    });
    this.confirmModal.hide();
  }
}
