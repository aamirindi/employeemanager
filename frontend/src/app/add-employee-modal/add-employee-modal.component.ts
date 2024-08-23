import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-add-employee-modal',
  templateUrl: './add-employee-modal.component.html',
  styleUrls: ['./add-employee-modal.component.css']
})
export class AddEmployeeModalComponent {
  data: Employee = {
    id: 0, 
    name: '',
    email: '',
    jobTitle: '',
    phone: '',
    imgUrl: '',
    employeeCode: ''
  };


  constructor(
    public dialogRef: MatDialogRef<AddEmployeeModalComponent>,
    private employeeService: EmployeeService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.employeeService.addEmployees(this.data).subscribe(
      (response) => {
        this.dialogRef.close(this.data);
      },
      (error: HttpErrorResponse) => {
        alert('There was an issue adding the employee. Please try again.');
      }
    );
  }

  isValidImageUrl(url: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  }
}
