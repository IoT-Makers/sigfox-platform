import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {FireLoopRef, Parser} from '../../shared/sdk/models';
import {RealTime} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';

@Component({

  templateUrl: './parsers.component.html',
  styleUrls: ['./parsers.component.scss']
})
export class ParsersComponent implements OnInit, OnDestroy {

  @ViewChild('confirmModal') confirmModal: any;

  private newParser: Parser = new Parser();
  private decodedPayload = [];
  private testPayload = [];

  private payload: any;

  private parsers: Parser[] = new Array<Parser>();
  private parserRef: FireLoopRef<Parser>;
  private parserSub: Subscription;

  private parserToRemove: Parser = new Parser();

  constructor(private rt: RealTime) { }

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
  }

  setup(): void {
    console.log(this.rt.connection);
    this.ngOnDestroy();
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
    if (this.parserRef)this.parserRef.dispose();
    if (this.parserSub)this.parserSub.unsubscribe();
  }

  decodePayload(i: number, parser: Parser, payload: string): void{
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

  closeDecodedPayload(i: number){
    this.testPayload[i] = false;
  }

  create(): void{
    this.newParser.id = null;
    console.log(this.newParser);
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

