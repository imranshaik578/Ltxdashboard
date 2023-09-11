import { Xliff } from '@angular/compiler';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'
const Excel_TYPE = 'application/vnd.openxmlformats-officedocuments.spreadsheets.sheet;charset=UTF-8';
const Excel_EXTESION = ".xlsx"

@Injectable({
  providedIn: 'root'
})
export class DownloadedService {
  

  constructor() { } 
  public  exportAsExcelFile(json:any[], excelFileName:string):void{
    const  worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const  workbook:XLSX.WorkBook = {Sheets:{'data':worksheet},SheetNames:['data']};
    const excelBuffer :any = XLSX.write(workbook,{bookType:'xlsx',type:'array'})
    this.saveAsExcelFile(excelBuffer,excelFileName);
  }
  private saveAsExcelFile(buffer:any,fileName:string):void{
    const data:Blob =  new Blob([buffer], {type:Excel_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + Excel_EXTESION);
  }
}
