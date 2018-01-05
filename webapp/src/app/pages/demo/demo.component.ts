import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../shared/sdk/models';

@Component({
  selector: 'app-messages',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, OnDestroy {

  private iFace: any;
  private frameType: any;
  private message: Message = new Message();

  public filterQuery = '';

  constructor() {

  }

  ngOnInit(): void {
    console.log('Demo: ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('Demo: ngOnDestroy');
  }

}

