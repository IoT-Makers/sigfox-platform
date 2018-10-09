const csv = require('fast-csv');
const loadEmployees = false;

module.exports = (app: any) => {
  if (loadEmployees) {
    const Employee = app.models.Employee;
    let countEmployees = 0;

    //Employee.destroyAll();

    csv.fromPath(__dirname + '/employees.csv')
      .on('data', (data: any) => {
        if (data[5] === 'Staff' || data[5] === 'STAFF') {
          countEmployees++;
          const employee = new Employee();
          employee.firstName = data[0];
          employee.lastName = data[1];
          employee.jobTitle = data[2];
          employee.country = data[4];
          employee.email = data[6];
          //console.log(employee);
          Employee.findOrCreate({where: {email: employee.email}}, employee, (err: any, employee: any, created: boolean) => {
            if (err) console.error(err);
            else if (created) console.log('Created: ' + employee.email);
            else console.log(employee.email + ' already exists.');
          });
        }
      })
      .on('end', () => {
        console.log('Loaded all employees: ' + countEmployees + ' in total.');
      });
  }
};
