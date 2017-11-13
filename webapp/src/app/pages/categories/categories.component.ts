import { Component, OnInit } from '@angular/core';

import {Category, Device, Message, FireLoopRef, Parser} from '../../shared/sdk/models';
import {CategoryApi, DeviceApi, RealTime} from '../../shared/sdk/services';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  private edit: boolean = false;


  private device: Device = new Device();

  private category: Category = new Category();
  private categorySub: Subscription;

  private devices: Device[] = new Array<Device>();
  private categories: Category[] = new Array<Category>();

  private categoryRef: FireLoopRef<Category>;


  constructor(private rt: RealTime, private categoryApi: CategoryApi, private deviceApi: DeviceApi) { }

  ngOnInit() {
    this.edit = false;

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
    this.ngOnDestroy();//Get and listen devices

    // Get and listen categories
    this.categoryRef = this.rt.FireLoop.ref<Category>(Category);
    this.categorySub = this.categoryRef.on('change', {include: 'Devices'}
    ).subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log(this.categories);
    });

  }

  ngOnDestroy(): void {
    console.log("Devices: ngOnDestroy");

    if (this.categoryRef)this.categoryRef.dispose();
    if (this.categorySub)this.categorySub.unsubscribe();
  }

}
