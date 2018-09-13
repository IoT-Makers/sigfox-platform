import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, OnDestroy {

  private filterQuery = '';

  constructor() {
  }

  ngOnInit(): void {
    console.log('Demo: ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('Demo: ngOnDestroy');
  }

}
