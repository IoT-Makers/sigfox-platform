import {Component, OnDestroy, OnInit} from '@angular/core';

import {FireLoopRef, Parser} from '../../shared/sdk/models';
import {ParserApi, RealTime} from '../../shared/sdk/services';
import {Subscription} from "rxjs/Subscription";

@Component({

  templateUrl: './parsers.component.html',
  styleUrls: ['./parsers.component.scss']
})
export class ParsersComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription[] = new Array<Subscription>();

  private parser: Parser = new Parser();
  private parsers: Parser[] = new Array<Parser>();
  private parserRef: FireLoopRef<Parser>;

  private deleteConfirmation = [];

  constructor(private rt: RealTime, private parserApi: ParserApi) {

    this.subscriptions.push(

      this.rt.onReady().subscribe(() => {
        this.parserRef = this.rt.FireLoop.ref<Parser>(Parser);
        this.parserRef.on('change').subscribe(
          (parsers: Parser[]) => {
            this.parsers = parsers;
            console.log(this.parsers);
          });

      }));
  }

  ngOnInit(): void {
    console.log(this.parsers);
  }

  ngOnDestroy(): void {
    console.log("Parsers: ngOnDestroy");
    this.parserRef.dispose();
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  update(parser: Parser): void {
    this.parserRef.upsert(parser).subscribe();
  }

  delete(i: number, value: boolean): void{
    this.deleteConfirmation[i] = value;
  }

  remove(parser: Parser): void {
    this.parserRef.remove(parser).subscribe();
  }
}

