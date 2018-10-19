import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {DeviceApi, EmployeeApi, UserApi} from '../../shared/sdk/services/custom';
import {Alert, Connector, Device, Employee} from '../../shared/sdk/models';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit, OnDestroy {

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
  public countEmployees;

  // Select
  public selectDevices: Array<Object> = [];
  public selectedDevices = [];
  public selectOneDeviceSettings = {
    singleSelection: true,
    text: 'Select one device',
    enableSearchFilter: true,
    classes: 'select-one-device'
  };

  // Notifications
  private toast;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });

  private user;

  constructor(private userApi: UserApi,
              private deviceApi: DeviceApi,
              private employeeApi: EmployeeApi,
              private toasterService: ToasterService) {

    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.log('Employee: ngOnInit');
    this.user = this.userApi.getCachedCurrent();
    this.setup();
  }

  setup(): void {
    this.getDevices();
    this.getEmployees();
  }

  getDevices(): void {
    this.deviceApi.find().subscribe((devices: Device[]) => {
      this.selectDevices = [];
      devices.forEach((device: Device) => {
        const item = {
          id: device.id,
          itemName: device.name ? device.name + ' (' + device.id + ')' : device.id
        };
        this.selectDevices.push(item);
      });
    });
  }

  getEmployees(): void {
    this.employeeApi.find({include: ['Device'], order: 'createdAt DESC'}).subscribe((employees: Employee[]) => {
      this.employees = employees;
      this.countEmployees = employees.length;
      this.employeesReady = true;
    });
  }

  openEditEmployeeModal(employee: Employee): void {
    this.selectedDevices = [];
    this.addEmployeeFlag = false;
    this.employeeToAddOrEdit = employee;
    if (employee.Device) this.selectedDevices[0] = {
      id: employee.Device.id,
      itemName: employee.Device.name ? employee.Device.name + ' (' + employee.Device.id + ')' : employee.Device.id
    };
    this.addOrEditEmployeeModal.show();
  }

  openConfirmEmployeeModal(employee: Employee): void {
    this.employeeToRemove = employee;
    this.confirmModal.show();
  }

  linkDeviceToEmployee(): void {
    if (this.selectedDevices[0]) {
      this.employeeApi.linkToDevice(this.employeeToAddOrEdit.id, this.selectedDevices[0].id).subscribe(value => {
        //this.toast = this.toasterService.pop('success', 'Success', 'Employee was successfully linked to device.');
        // TODO: enable real-time
        this.getEmployees();
      }, err => {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('error', 'Error', err.error.message);
      });
    }
  }

  editEmployee(): void {
    this.employeeApi.updateAttributes(this.employeeToAddOrEdit.id, this.employeeToAddOrEdit).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Employee was successfully updated.');
      this.linkDeviceToEmployee();
      this.addOrEditEmployeeModal.hide();
      // TODO: enable real-time
      this.getEmployees();
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
      // TODO: enable real-time
      this.getEmployees();
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
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
      this.employeeToAddOrEdit.id = value.id;
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Employee was successfully updated.');
      this.linkDeviceToEmployee();
      this.addOrEditEmployeeModal.hide();
      // TODO: enable real-time
      this.getEmployees();
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

