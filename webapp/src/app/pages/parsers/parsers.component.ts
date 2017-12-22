import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FireLoopRef, Parser, User} from '../../shared/sdk/models';
import {RealTime} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {UserApi} from '../../shared/sdk/services/custom';

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

  private parsers: Parser[] = new Array<Parser>();
  private parserRef: FireLoopRef<Parser>;
  private parserSub: Subscription;

  private parserToRemove: Parser = new Parser();

  constructor(private rt: RealTime,
              private userApi: UserApi) { }

  ngOnInit(): void {
    if (
      this.rt.connection.isConnected() &&
      this.rt.connection.authenticated
    ) {
      this.rt.onReady().subscribe(() => this.setup());
    } else {
      this.rt.onAuthenticated().subscribe(() => this.setup());
      this.rt.onReady().subscribe();
    }

    this.newParser.function = 'var payload,\n' +
      '  temperature,\n' +
      '  parsedData = [],\n' +
      '  obj = {};\n' +
      '\n' +
      '// If byte #1 of the payload is temperature\n' +
      'var temperature = parseInt(payload.slice(0, 2), 2);\n' +
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
    this.ngOnDestroy();
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
      setTimeout(function() {
        this.testPayload[i] = false;
      }.bind(this), 2000);
    }
  }

  closeDecodedPayload(i: number) {
    this.testPayload[i] = false;
  }

  create(): void {
    this.newParser.id = null;
    this.parserRef.create(this.newParser).subscribe(() => this.newParser = new Parser());
  }

  update(parser: Parser): void {
    this.parserRef.upsert(parser).subscribe();
  }

  showRemoveModal(parser: Parser): void {
    this.confirmModal.show();
    this.parserToRemove = parser;
  }

  remove(): void {
    this.parserRef.remove(this.parserToRemove).subscribe();
    this.confirmModal.hide();
  }
}

