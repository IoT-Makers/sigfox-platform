import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {EmployeeApi, UserApi} from '../../shared/sdk/services/custom';
import {Employee} from '../../shared/sdk/models';


@Component({
  selector: 'app-employees',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit, OnDestroy {

  @ViewChild('addOrEditEmployeeModal') addOrEditEmployeeModal: any;
  @ViewChild('updateEmployeeModal') updateEmployeeModal: any;
  @ViewChild('confirmModal') confirmModal: any;

  // Flags
  public employeesReady = false;
  public addEmployeeFlag = false;

  public filterQuery = '';

  public employees: Employee[] = [];
  public employeeToAddOrEdit: Employee = new Employee();
  public employeeToRemove: Employee;

  // Notifications
  private toast;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });


  constructor(private userApi: UserApi,
              private employeeApi: EmployeeApi,
              private toasterService: ToasterService) {

    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.log('Employee: ngOnInit');
    this.setup();
  }

  setup(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeApi.find().subscribe((employees: Employee[]) => {
      this.employees = employees;
      this.employeesReady = true;
    });
  }

  openEditEmployeeModal(employee: Employee): void {
    this.addEmployeeFlag = false;
    this.employeeToAddOrEdit = employee;
    this.addOrEditEmployeeModal.show();
  }

  openConfirmEmployeeModal(employee: Employee): void {
    this.employeeToRemove = employee;
    this.confirmModal.show();
  }

  editEmployee(): void {
    this.employeeApi.updateAttributes(this.employeeToAddOrEdit.id, this.employeeToAddOrEdit).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Employee was successfully updated.');
      this.addOrEditEmployeeModal.hide();
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
  }

  showRemoveModal(employee: Employee): void {
    this.confirmModal.show();
    this.employeeToRemove = employee;
  }

  deleteEmployee(): void {
    this.employeeApi.deleteById(this.employeeToRemove.id).subscribe((value: any) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Employee was deleted successfully.');
      this.confirmModal.hide();
      this.getEmployees();
    });
  }

  openAddEmployeeModal(): void {
    this.addEmployeeFlag = true;
    this.employeeToAddOrEdit = new Employee();

    this.addOrEditEmployeeModal.show();
  }

  addEmployee(): void {
    this.employeeApi.create(this.employeeToAddOrEdit).subscribe(value => {
      console.log(value);
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Employee was successfully updated.');
      this.addOrEditEmployeeModal.hide();
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
  }

  ngOnDestroy(): void {
    console.log('Employee: ngOnDestroy');
    this.cleanSetup();
  }

  private cleanSetup() {
  }

}

