import {Component, OnDestroy, OnInit} from '@angular/core';
import {RealtimeService} from "../../shared/realtime/realtime.service";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, OnDestroy {

  private filterQuery = '';

  constructor(private rt: RealtimeService) {
  }

  ngOnInit(): void {
    console.log('Demo: ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('Demo: ngOnDestroy');
  }

}
