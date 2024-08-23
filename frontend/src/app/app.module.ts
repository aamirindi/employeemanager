import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { EditEmployeeModalComponent } from './edit-employee-modal/edit-employee-modal.component';
import { EmployeeService } from './employee.service';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteEmployeeModalComponent } from './delete-employee-modal/delete-employee-modal.component';
import { AddEmployeeModalComponent } from './add-employee-modal/add-employee-modal.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [AppComponent, EditEmployeeModalComponent, DeleteEmployeeModalComponent, AddEmployeeModalComponent, ConfirmComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,  
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
