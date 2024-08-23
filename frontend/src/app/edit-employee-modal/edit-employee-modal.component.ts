import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee-modal',
  templateUrl: './edit-employee-modal.component.html',
  styleUrls: ['./edit-employee-modal.component.css']
})
export class EditEmployeeModalComponent {
  public employee: any;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private employeeService: EmployeeService
  ) {
    this.employee = { ...data.employee };
  }

  onSubmit(): void {
    const confirmDialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: { 
        title: 'Confirm Edit',
        message: `Are you sure you want to update the details of ${this.employee.name}?`
      }
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.employeeService.updateEmployees(this.employee).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error updating employee:', error.message);
            alert('There was an issue updating the employee. Please try again.');
          }
        );
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
