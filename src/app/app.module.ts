import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgApexchartsModule } from "ng-apexcharts";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { MatCellDef, MatHeaderCellDef, MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { MatDialog, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { UserTableComponent } from './user-table/user-table.component';
import { TableComponent } from './table/table.component';
import { NgToastModule } from 'ng-angular-popup';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { Routes, RouterModule } from '@angular/router';


// const routes:Routes = [
//   {path:'Home',component:DashboardComponent},
//   {path:'userview',component:DetailViewComponent}
// ]






@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    DashboardComponent,
    UserTableComponent,
    TableComponent,
    DetailViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    MatPaginatorModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatOptionModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    NgToastModule,
    // RouterModule.forRoot()

  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
