import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-delete-employee-modal',
  templateUrl: './delete-employee-modal.component.html',
  styleUrls: ['./delete-employee-modal.component.css']
})
export class DeleteEmployeeModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteEmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private employeeService: EmployeeService
  ) {}

  onConfirm(): void {
    const confirmDialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: { 
        title: 'Confirm Delete',
        message: `Are you sure you want to delete ${this.data.employee.name}?`
      }
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.employeeService.deleteEmployees(this.data.employee.id).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error deleting employee:', error.message);
            alert('There was an issue deleting the employee. Please try again.');
          }
        );
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
