import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';
import { EditEmployeeModalComponent } from './edit-employee-modal/edit-employee-modal.component';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { DeleteEmployeeModalComponent } from './delete-employee-modal/delete-employee-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AddEmployeeModalComponent } from './add-employee-modal/add-employee-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('toggleSearch', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent {
  public employees: Employee[] = [];
  public filteredEmployees: Employee[] = [];
  public searchTerm: string = '';
  isSearchVisible: boolean = false;
  isSmallScreen: boolean = window.innerWidth <= 640;
  defaultImageUrl: string = 'https://www.nicepng.com/png/detail/501-5010656_my-account-comments-my-account-icon-vector.png';

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe((response: Employee[]) => {
      this.employees = response;
      this.filteredEmployees = response;
    });
  }

  public openEditEmployeeModal(employee: Employee): void {
    const dialogRef = this.dialog.open(EditEmployeeModalComponent, {
      data: { employee: employee },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getEmployees();
      }
    });
  }

  public openDeleteEmployeeModal(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteEmployeeModalComponent, {
      data: { employee: employee },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteEmployee(employee.id);
      }
    });
  }

  public openAddEmployeeModal(): void {
    const dialogRef = this.dialog.open(AddEmployeeModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getEmployees();
      }
    });
  }

  private deleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployees(employeeId).subscribe(
      () => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting employee:', error.message);
        alert('There was an issue deleting the employee. Please try again.');
      }
    );
  }

  toggleSearch(): void {
    this.isSearchVisible = !this.isSearchVisible;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isSmallScreen = window.innerWidth <= 640;
  }

  // Get image URL or default image URL
  getEmployeeImageUrl(imgUrl: string): string {
    return imgUrl ? imgUrl : this.defaultImageUrl;
  }

  // Set default image on error
  setDefaultImage(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = this.defaultImageUrl;
    }
  }

  // Filter employees based on the search term
  filterEmployees(): void {
    if (!this.searchTerm) {
      this.filteredEmployees = this.employees;
    } else {
      this.filteredEmployees = this.employees.filter((employee) =>
        employee.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
