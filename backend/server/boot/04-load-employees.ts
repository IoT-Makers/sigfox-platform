const csv = require('fast-csv');
const loadEmployees = false;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

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
          // employee.firstName = capitalizeFirstLetter(data[0]);
          // employee.lastName = capitalizeFirstLetter(data[1]);
          employee.firstName = capitalizeFirstLetter(data[6].substring(0, data[6].indexOf('.')));
          employee.lastName = capitalizeFirstLetter(data[6].substring(data[6].indexOf('.') + 1, data[6].lastIndexOf('@')));
          employee.jobTitle = data[2];
          employee.country = data[4];
          employee.email = data[6].toLowerCase();
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
