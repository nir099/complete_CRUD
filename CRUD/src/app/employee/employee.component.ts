import { Employee } from './../shared/employee.model';
import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';

declare let M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [ EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor( private employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm( form?: NgForm) {
    console.log('here');
    if ( form ) {
      form.reset();
    }
    this.employeeService.selectedEmployee = {
      _id: '',
      name: '',
      position: '',
      office: '',
      salary: null
    };
  }
  onSubmit(form: NgForm) {
    if ( form.value._id === '') {
      this.employeeService.postEmployee(form.value).subscribe( (res) => {
        console.log('came here');
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'saved successfully' , classes: 'rounded' });
      });
    } else {
      this.employeeService.putEmployee(form.value).subscribe( (res) => {
        console.log('came here 2');
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'updated successfully' , classes: 'rounded' });
      });
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe( (res) => {
      this.employeeService.employees = res as Employee[] ;
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: String , form: NgForm ) {
    if ( confirm('Are you sure to delete this record ?') === true ) {
      this.employeeService.deleteEmployee(_id).subscribe( (res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully' , classes: 'rounded' });
      });
    }
  }
}
