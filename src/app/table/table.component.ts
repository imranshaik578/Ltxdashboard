import { Component, HostListener } from '@angular/core';
import * as XLSX from 'xlsx';
import { utils, writeFile } from 'xlsx';
import { ServiceService } from '../api/service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {


  imran = []

  ExcelData:any;

  constructor(private api:ServiceService){}

  readexcel(event:any){
    let file = event.target.files[0];
    let filereader = new FileReader();
    filereader.readAsBinaryString(file);
    filereader.onload = (e) =>{
      var workbook = XLSX.read(filereader.result,{type:'binary'});
      var sheetNames = workbook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
      console.log(this.ExcelData);
    }

  }


  download(){
    const headers = [["S.NO","Name","Project","Task"]];
    const wb = utils.book_new();
    const ws:any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws,headers);
    utils.sheet_add_json(ws, this.ExcelData, 
      {

      origin:'A2',
      skipHeader: true,

    });
    utils.book_append_sheet(wb,ws,'Users');
    writeFile(wb,'Saas-Sqa.csv')
  }

  template(){
    const headers = [["S.NO","Name","Project","Task"]];
    const wb = utils.book_new();
    const ws:any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws,headers);
    utils.sheet_add_json(ws, this.imran, 
      {

      origin:'A2',
      skipHeader: true,

    });
    utils.book_append_sheet(wb,ws,'Users');
    writeFile(wb,'Saas-Sqa.csv')
  }

  }


