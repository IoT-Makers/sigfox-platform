import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MomentModule} from 'angular2-moment';
import {FormsModule} from '@angular/forms';
import {CategoriesComponent} from './categories.component';
import {CategoriesRoutingModule} from './categories-routing.module';
import {ToasterModule} from 'angular2-toaster';
import {ModalModule, TooltipModule} from 'ng2-bootstrap';


@NgModule({
  imports: [
    CategoriesRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    ToasterModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [CategoriesComponent]
})
export class CategoriesModule {
}
