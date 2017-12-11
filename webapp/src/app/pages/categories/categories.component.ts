import {Component, OnInit} from '@angular/core';
import {Category, Device, FireLoopRef, User} from '../../shared/sdk/models';
import {CategoryApi, DeviceApi, RealTime, UserApi} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  private user: User;

  private device: Device = new Device();

  private category: Category = new Category();
  private categorySub: Subscription;

  private devices: Device[] = new Array<Device>();
  private categories: Category[] = new Array<Category>();

  private categoryRef: FireLoopRef<Category>;

  private edit = false;
  private categoryToEdit: Category = new Category();
  private newCategory = false;

  private propertyType = ['string', 'number', 'geoloc', 'date', 'boolean'];


  constructor(private rt: RealTime,
              private categoryApi: CategoryApi,
              private deviceApi: DeviceApi,
              private userApi: UserApi) { }

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
    this.ngOnDestroy();
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

    // Get and listen categories
    this.categoryRef = this.rt.FireLoop.ref<Category>(Category);
    this.categorySub = this.categoryRef.on('change',
      {
        include: ['Devices'],
        where: {
          userId: this.user.id
        }
      }
    ).subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  editCategory(category: Category): void {
    this.edit = true;
    if (category) {
      this.categoryToEdit = category;
    } else {
      this.categoryToEdit = new Category();
      this.newCategory = true;
      console.log(this.categoryToEdit);
    }
  }

  cancel(): void{
    this.edit = false;
  }

  update(category: Category): void {
    category.userId = this.user.id;
    this.edit = false;
    console.log(category);
    if(this.newCategory){
      delete category.id;
    }
    this.categoryRef.upsert(category).subscribe();

  }

  addProperty(category: Category): void {
    const property: any = {
      key: '',
      value: '',
      type: 'string'
    };

    category.properties.push(property);
    this.categoryToEdit = category;
  }

  removeProperty(category: Category, index: number): void {
    //delete category.properties[index];
    category.properties.splice(index, 1);
    this.categoryToEdit = category;
  }

  removeCategory(category: Category): void {
    this.categoryRef.remove(category).subscribe();
  }

  ngOnDestroy(): void {
    console.log('Categories: ngOnDestroy');

    if (this.categoryRef)this.categoryRef.dispose();
    if (this.categorySub)this.categorySub.unsubscribe();
  }

}
