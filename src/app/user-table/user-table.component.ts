import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../api/service.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { utils, writeFile } from 'xlsx';
import * as xlsx from "xlsx";
import * as saveAs from 'file-saver';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { DownloadedService } from '../downloaded.service';
import { FileSaverService } from 'ngx-filesaver';
import dbdata from 'db.json';
import * as XLSX from 'xlsx';





interface userdatafetch {
      names: string,
      date: string,
      dname:  string,
      prodver: string,
      tesver: string,
      cf: string,
      lpm: string,
      vm: string,
      cmt: string,
      id: Number

}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit{
  

  
  imran  = []
  displayedColumns = ['names', 'date', 'dname', 'prodver','tesver','cf','lpm','vm','cmt',"action"];
  dataSource = new MatTableDataSource<any>;
  paginator: any;


  // userdatas : userdatafetch = dbdata;

  
  @ViewChild(MatPaginator) pagination! : MatPaginator;
  @ViewChild(MatSort) sort! :MatSort
  excelIO: any;
  spread: any;
  toast: any;

  constructor(private _dialog: MatDialog, private api : ServiceService, private toasts : NgToastService, private file:FileSaverService) {
    
  }

  ngOnInit(): void {
    this.usersdata()

  }

  // datafetch = this.api.getjsondata().subscribe((res:any)=>{console.log(JSON.stringify(res))});

  exportAsExcel():any{
    this.api.getjsondata().subscribe((res:any)=>{


          localStorage.setItem('added-items',JSON.stringify(res));
          alert("Data saved in localstorage successfully")    
    });
    
  }

  editusers(row:any){
    this._dialog.open(AddUserComponent,{
    data : row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.usersdata();
      }
    })
    
  }

  deleteuser(id:number){
    this.api.deleteuser(id).subscribe({
      next:(res:any)=>{
        this.toasts.success({detail:"Success Message", summary:"User deleted Successfully",duration:5000})

        this.usersdata();
      },
      error:()=>{
        this.toasts.error({detail:"Error Message", summary:"Error while deleting the user!",duration:5000})

      }
    })
  }

  downloaded(){
    const headers = [['Names', 'date', 'Device', 'prod ver','er','CF','lpm','VM','Comment',"action"]];
    const wb = utils.book_new();
    const ws:any = utils.json_to_sheet([]);
    const value = [['dfdf', 'dfdf', 'fgfgfg', 'rtr ver','fgwfdfg','44','rtfr','VM','Comment',"action"]];
    utils.sheet_add_aoa(ws,headers);
    utils.sheet_add_aoa(ws,value);
    this.api.getjsondata().subscribe((res:any)=>{
      console.log(res);
  
});
    utils.sheet_add_json(wb, this.imran), 
      {

      origin:'A2',
      skipHeader: true,

    };
    
    utils.book_append_sheet(wb,ws,'Users');
    writeFile(wb,'Saas-Sqa.xlsx')
   }


   usersdata():any{
    this.api.getuser()
    .subscribe({
      next:(res:any)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        



      },
      error:()=>{
        this.toasts.error({detail:"Error Message", summary:"Error While fetching users data!",duration:5000})
        
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  


  



}
